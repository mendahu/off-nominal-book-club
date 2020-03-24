import ListItem from "./ListItem";

export default function List(props) {
  return (
    <section>
      {props.list.map((item, index) => (
        <ListItem
          key={index}
          item={item}
          displayData={props.displayData}
          link={props.link}
        />
      ))}
    </section>
  );
}
