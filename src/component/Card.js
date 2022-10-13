// use js in react component
// const todoTitle = "start learn react with 18/9/2022";
// const desription = "very happy to learn react";
const date = new Date();
const dateName = date.getDate();
const monthName = date.getMonth();
const yearName = date.getFullYear();

function Card(props) {
  //use destructation and props in reactJs
  const { name, descript } = props;

  return (
    <div className="card">
      <h1 className="cardTitle">{name}</h1>
      <p className="cardDes">{descript}</p>
      <p className="cardDate">{dateName + "/" + monthName + "/" + yearName}</p>
    </div>
  );
}
export default Card;
