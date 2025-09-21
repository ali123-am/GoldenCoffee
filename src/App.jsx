import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage.jsx";
import { BasketProvider } from "./Context/BasketContext.jsx";
import { SidebarProvider } from "./Context/SidebarContext.jsx";
import { Toaster } from "sonner";
import "./App.css";
import { AuthFormProvider } from "./Context/AuthFormContext.jsx";
import Layout from "./layout.jsx";
import NotBuilding from "./components/NotBuilding.jsx";
import StoreProvider from "./pages/ProductsPage/context/StoreProvider.jsx";
import { UserInfoProvider } from "./Context/UserInfoContext.jsx";
import LoaderDotsBetter from "./components/LoaderDotsBetter.jsx";
const ProductDetailsPage = lazy(() =>
  import("./pages/ProductDetails/PageDetails.jsx")
);
const ContactPage = lazy(() => import("./components/ContactPage.jsx"));
const Page404 = lazy(() => import("./components/Page404.jsx"));
const CartPage = lazy(() => import("./pages/Cart/CartPage.jsx"));
const AuthPage = lazy(() => import("./pages/LoginOrRegister/AuthPage"));
const ProductsPage = lazy(() =>
  import("./pages/ProductsPage/ProductsPage.jsx")
);
const Dashbord = lazy(() =>
  import("./pages/UserAccountPage/UserAccountPage.jsx")
);
const DictionaryPage = lazy(() =>
  import("./pages/Dictionary/DictionaryPage.jsx")
);
const About = lazy(() => import("./components/AboutUs.jsx"));
function App() {
  return (
    <UserInfoProvider>
      <BasketProvider>
        <AuthFormProvider>
          <SidebarProvider>
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-screen ">
                  <LoaderDotsBetter size={10}/>
                </div>
              }
            >
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<MainPage />}></Route>
                  <Route path="/About" element={<About />}></Route>
                  <Route path="/Cart" element={<CartPage />}></Route>
                  <Route
                    path="/Store"
                    element={
                      <StoreProvider>
                        <ProductsPage />
                      </StoreProvider>
                    }
                  />

                  <Route path="/Dashbord" element={<Dashbord />}></Route>
                  <Route path="/contact-us" element={<ContactPage />}></Route>
                  <Route
                    path="/Dictionary"
                    element={<DictionaryPage />}
                  ></Route>
                  <Route path="/Store" element={<NotBuilding />}></Route>
                  <Route path="/Contact" element={<NotBuilding />}></Route>

                  <Route
                    path="/product/:id"
                    element={
                      <Suspense
                        fallback={
                          <div className="flex justify-center h-screen items-center py-25">
                            <LoaderDotsBetter />
                          </div>
                        }
                      >
                        <ProductDetailsPage />
                      </Suspense>
                    }
                  />
                </Route>

                <Route path="/Auth" element={<AuthPage />}></Route>
                <Route path="*" element={<Page404 />}></Route>
              </Routes>

              <Toaster position="top-left" richColors />
              {/* <Toaster position="top-left" reverseOrder={false} /> */}
            </Suspense>
          </SidebarProvider>
        </AuthFormProvider>
      </BasketProvider>
    </UserInfoProvider>
  );
}

export default App;
