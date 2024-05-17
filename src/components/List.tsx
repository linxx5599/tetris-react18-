import React from "react";

type row = {
  socketId: React.Key;
  name: String;
};

type listType = {
  dataSource: row[];
};

const List: React.FC<listType> = ({ dataSource }) => {
  return dataSource.map((row) => {
    return (
      <div className="list" key={row.socketId}>
        {row.name}
      </div>
    );
  });
};
export default List;
