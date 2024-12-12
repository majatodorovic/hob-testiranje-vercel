//f-ja za handlovanje otvaranja i zatvaranja menija ili pretrage
import Link from "next/link";
import { icons } from "@/_lib/icons";

export const handleOpen = (open, type) => (setOpen) => {
  setOpen({ open, type });
};

//f-ja za setovanje termina pretrage
export const handleSearch = (term) => (setSearch) => {
  setSearch({ term });
};

//f-ja za handlovanje klikova na kategorije (otvaranje podkategorija, zatvaranje podkategorija...);
export const handleCategoryClick = (
  selected_category,
  selectedCategories,
  setSelectedCategories,
) => {
  if (selected_category?.id) {
    const is_selected = isSelected(selected_category, selectedCategories);

    switch (is_selected) {
      case true:
        return handleAlreadySelectedCategory(
          selected_category,
          selectedCategories,
          setSelectedCategories,
        );
      case false:
        return handleAddSelectedCategory(
          selected_category,
          selectedCategories,
          setSelectedCategories,
        );
    }
  }
};

//f-ja za proveru da li je kategorija vec selektovana ili ne
export const isSelected = (selected_category, selectedCategories) => {
  let is_selected = false;

  (selectedCategories || [])?.forEach(({ id }) => {
    if (id === selected_category?.id) {
      is_selected = true;
    }
  });
  return is_selected;
};

//f-ja za brisanje vec selektovane kategorije (brise i sve podkategorije, tj sve kategorije ispod nje koje su selektovane)
const handleAlreadySelectedCategory = (
  selected_category,
  selectedCategories,
  setSelectedCategories,
) => {
  let arr = [...selectedCategories];
  const index_of_selected_category = (selectedCategories || [])?.findIndex(
    ({ id }) => id === selected_category.id,
  );

  arr.splice(index_of_selected_category);

  setSelectedCategories(arr);
};

//f-ja za dodavanje selektovane kategorije (dodaje samo jednu tj selektovanu)
const handleAddSelectedCategory = (
  selected_category,
  selectedCategories,
  setSelectedCategories,
) => {
  setSelectedCategories([...selectedCategories, selected_category]);
};

//f-ja za mapiranje kategorija
export const handleMapCategories = (
  categories,
  selectedCategories,
  setSelectedCategories,
  setOpen,
) => {
  return (categories || []).map((category) => {
    if (category?.id) {
      const {
        name,
        parent_id,
        children,
        id,
        link: { link_path },
      } = category;

      let has_children = children?.length > 0 && children;

      if (has_children) {
        return (
          <div
            className={`flex flex-col !uppercase ${parent_id ? `pl-4` : ``}`}
            key={`category-${id}`}
          >
            <div
              className={`flex w-full items-center justify-between px-4 py-1`}
            >
              <Link
                onClick={() => {
                  handleOpen(false, null)(setOpen);
                  setSelectedCategories([]);
                }}
                href={`/${link_path}`}
                className={`${
                  !parent_id ? `text-xl` : `text-base font-normal`
                } ${
                  isSelected(category, selectedCategories)
                    ? `!font-bold`
                    : `!font-normal`
                }`}
              >
                {name}
              </Link>
              <span
                className={`block rounded-md bg-white/60 p-1 text-black ${isSelected(category, selectedCategories) ? `rotate-90 transform transition-transform duration-300` : `rotate-0 transform transition-transform duration-300`}`}
                onClick={() =>
                  handleCategoryClick(
                    category,
                    selectedCategories,
                    setSelectedCategories,
                  )
                }
              >
                {icons.chevron_right}
              </span>
            </div>
            {isSelected(category, selectedCategories) && (
              <div className={`my-2 flex flex-col`}>
                {handleMapCategories(
                  children,
                  selectedCategories,
                  setSelectedCategories,
                  setOpen,
                )}
              </div>
            )}
          </div>
        );
      } else {
        return (
          <Link
            onClick={() => {
              handleOpen(false, null)(setOpen);
              setSelectedCategories([]);
            }}
            key={`category-${id}`}
            href={`/${link_path}`}
            className={`px-4 !uppercase ${!parent_id ? `py-1 text-xl font-medium` : `py-2 pl-6 text-base font-normal`}`}
          >
            {name}
          </Link>
        );
      }
    }
  });
};
