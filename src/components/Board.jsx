import MainButton from "./MainButton";


export default function Board() {
  return (
    <div>
      <div className="empty-board">
        <p> This board is empty. Create a new column to get started.</p>
        <MainButton text={"+ Add New Column"}/>
      </div>
    </div>
  );
}
