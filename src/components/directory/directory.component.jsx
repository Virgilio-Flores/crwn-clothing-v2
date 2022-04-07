import CategoryItem from "../category-item/category-item.component";
import "./directory.styles.scss";

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map(({ id, ...others }) => (
        <CategoryItem key={id} {...others} />
      ))}
    </div>
  );
};

export default Directory;
