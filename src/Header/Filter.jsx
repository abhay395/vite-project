import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";

function Filter({ applyFilters }) {
  const [is4, setIs4] = useState(false);
  const [is3, setIs3] = useState(false);
  const [is2, setIs2] = useState(false);
  const [is1, setIs1] = useState(false);

  useEffect(() => {
    applyFilters({ is4, is3, is2, is1 });
  }, [is4, is3, is2, is1]);

  return (
    <div>
      <h2>Filter by Rating</h2>
      <div>
        <input type="checkbox" checked={is4} onChange={() => setIs4(!is4)} />
        <label>4.5 or up</label>
      </div>
      <div>
        <input type="checkbox" checked={is3} onChange={() => setIs3(!is3)} />
        <label>3 or up</label>
      </div>
      <div>
        <input type="checkbox" checked={is2} onChange={() => setIs2(!is2)} />
        <label>2 or up</label>
      </div>
      <div>
        <input type="checkbox" checked={is1} onChange={() => setIs1(!is1)} />
        <label>1 or up</label>
      </div>
    </div>
  );
}

export default Filter;
