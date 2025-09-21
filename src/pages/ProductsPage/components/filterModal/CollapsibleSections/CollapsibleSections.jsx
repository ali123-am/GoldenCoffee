import { useState, useMemo } from "react";
import { useUI } from "../../../context/UIContext.jsx";
import { useURLSearchParams } from "../../../hooks/useURLSearchParams.js";
import { useSection } from "../../../hooks/useSection.jsx";
import CollapsibleSection from "./CollapsibleSection.jsx";

export default function CollapsibleSections() {
  const { openSection } = useUI();
  const { updateParam } = useURLSearchParams();
  const sections = useSection();
  const [localSearch, setLocalSearch] = useState({});

  const filteredSections = useMemo(() => {
    const result = {};
    sections.forEach(({ type, data }) => {
      const searchValue = localSearch[type] || "";
      result[type] = data.filter(
        (item) =>
          item.fa?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.en?.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    return result;
  }, [sections, localSearch]);

  return (
    <>
      {sections.map((section) => (
        <CollapsibleSection
          key={section.type}
          section={section}
          open={openSection === section.type}
          searchValue={localSearch[section.type] || ""}
          setLocalSearch={setLocalSearch}
          filteredData={filteredSections[section.type] || []}
          updateParam={updateParam}
        />
      ))}
    </>
  );
}
