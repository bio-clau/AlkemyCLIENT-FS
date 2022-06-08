import React from "react";
import { useSelector } from "react-redux";
import { List, Divider, CircularProgress } from "@mui/material";
import Items from "./Items";

function Display() {
  const allOp = useSelector((state) => state.allOp);
  return (
    <List
      sx={{
        width: "100%",
        marginTop: 10,
        marginLeft: 3,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 500,
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      {allOp.length < 1 ? (
        <CircularProgress sx={{ marginTop: 20 }} />
      ) : (
        allOp.map((o) => (
          <div key={o.id}>
            <Items
              id={o.id}
              date={o.date}
              type={o.typeOp}
              amount={o.amount}
              concept={o.concept}
              category={o.category}
            />
            <Divider />
          </div>
        ))
      )}
    </List>
  );
}

export default Display;
