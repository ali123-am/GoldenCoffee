// src/hooks/useComments.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../supabaseClient";
import { toast } from "sonner";

export function useComments({ productID, page = 1, limit = 5 }) {
  const queryClient = useQueryClient();
  const userID = 6; // کاربر فعلی، میتونی داینامیک کنی

  // گرفتن کامنت‌های صفحه جاری
  const fetchCommentsPage = async () => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await supabase
      .from("Comments")
      .select("*", { count: "exact" })
      .eq("productID", productID)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;
    return { items: data ?? [], total: count ?? 0 };
  };

  // گرفتن تمام ریتینگ‌ها برای avgRating
  const fetchAllRatings = async () => {
    const { data, error } = await supabase
      .from("Comments")
      .select("rating")
      .eq("productID", productID);

    if (error) throw error;
    return data.map((c) => c.rating);
  };

  const {
    data: pageData,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["commentsPage", productID, page],
    queryFn: fetchCommentsPage,
    keepPreviousData: true,
    staleTime: 1000 * 60,
    onError: () => toast.error("دریافت دیدگاه‌ها با مشکل مواجه شد."),
  });

  const { data: ratings = [] } = useQuery({
    queryKey: ["ratings", productID],
    queryFn: fetchAllRatings,
    staleTime: 1000 * 60,
    onError: () => toast.error("دریافت ریتینگ‌ها با مشکل مواجه شد."),
  });

  // گرفتن واکنش‌های کاربر روی کامنت‌های صفحه
  const fetchReactions = async () => {
    const { data: commentIDs, error: idError } = await supabase
      .from("Comments")
      .select("id")
      .eq("productID", productID)
      .range((page - 1) * limit, page * limit - 1);

    if (idError) throw idError;

    const { data, error } = await supabase
      .from("CommentReactions")
      .select("*")
      .in("commentID", commentIDs.map((c) => c.id));

    if (error) throw error;
    return data;
  };

  const { data: userReactions = [] } = useQuery({
    queryKey: ["reactions", productID, page],
    queryFn: fetchReactions,
    staleTime: 1000 * 60,
  });

  // Mutation لایک/دیسلایک
  const mutationReact = useMutation({
    mutationFn: async ({ commentID, type }) => {
      const currentType =
        userReactions.find(
          (r) => r.commentID === commentID && r.userID === userID
        )?.type || null;

      // گرفتن مقدار فعلی لایک/دیسلایک
      const { data: comment, error: fetchError } = await supabase
        .from("Comments")
        .select("likes, dislikes")
        .eq("id", commentID)
        .single();

      if (fetchError) throw fetchError;

      let newLikes = comment.likes;
      let newDislikes = comment.dislikes;

      if (currentType === type) {
        // Toggle off
        if (type === "like") newLikes--;
        else newDislikes--;

        await supabase
          .from("CommentReactions")
          .delete()
          .eq("commentID", commentID)
          .eq("userID", userID);
      } else {
        if (currentType) {
          // تغییر نوع واکنش
          if (currentType === "like") newLikes--;
          else newDislikes--;

          if (type === "like") newLikes++;
          else newDislikes++;

          await supabase
            .from("CommentReactions")
            .update({ type })
            .eq("commentID", commentID)
            .eq("userID", userID);
        } else {
          // اضافه کردن واکنش جدید
          if (type === "like") newLikes++;
          else newDislikes++;

          await supabase
            .from("CommentReactions")
            .insert([{ commentID, userID, type }]);
        }
      }

      // بروزرسانی تعداد کل لایک/دیسلایک در جدول Comments
      await supabase
        .from("Comments")
        .update({ likes: newLikes, dislikes: newDislikes })
        .eq("id", commentID);
    },
    onSuccess: () => {
      toast.success("واکنش شما ثبت شد");
      queryClient.invalidateQueries(["commentsPage", productID]);
      queryClient.invalidateQueries(["reactions", productID, page]);
    },
    onError: (err) => {
      console.log(err);
      toast.error("خطا در ثبت واکنش");
    },
  });

  const commentsWithReactions = (pageData?.items || []).map((c) => {
    const commentReactions = userReactions.filter((r) => r.commentID === c.id);
    const likes = commentReactions.filter((r) => r.type === "like").length;
    const dislikes = commentReactions.filter((r) => r.type === "dislike").length;
    const userReaction =
      commentReactions.find((r) => r.userID === userID)?.type || null;
    return { ...c, likes, dislikes, userReaction };
  });

  const showPageLoading = isFetching && !isLoading;

  // Mutation اضافه کردن کامنت
  const mutationAddComment = useMutation({
    mutationFn: async ({ text, rating, author }) => {
      const { data, error } = await supabase.from("Comments").insert([
        {
          productID,
          userID,
          text,
          rating,
          author,
          likes: 0,
          dislikes: 0,
        },
      ]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("دیدگاه شما اضافه شد!");
      queryClient.invalidateQueries(["commentsPage", productID]);
      queryClient.invalidateQueries(["ratings", productID]);
      queryClient.invalidateQueries(["reactions", productID, page]);
    },
    onError: () => toast.error("خطا در ثبت دیدگاه"),
  });

  const avgRating =
    ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
      : 0;

  return {
    comments: commentsWithReactions,
    total: pageData?.total || 0,
    totalPages: Math.ceil((pageData?.total || 0) / limit),
    ratings,
    avgRating,
    isLoading,
    isError,
    showPageLoading,
    userReactions,
    mutationAddComment,
    mutationReact,
  };
}
