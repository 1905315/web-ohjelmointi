import React from "react";
import { Link } from "react-router-dom";

import { useState, useContext } from "react";
import yhteystiedotContext from "../context/YhteystiedotContext";
import { useNavigate } from "react-router-dom";
const Puhelintieto = (props) => {
  const YhteystiedotContext = useContext(yhteystiedotContext); //hooks
  let history = useNavigate();
  const [naytaPuhelintieto, setnaytaPuhelintieto] = useState(false);
  const onDeleteClick = (id) => {
    YhteystiedotContext.poistaYhteystieto(id);
    window.location.reload();
    history("/");
  };
  const onShowClick = (e) => {
    let lippu = !naytaPuhelintieto;
    setnaytaPuhelintieto(lippu);
  };
  const { id, nimi, puhelin } = props.yhteystieto;
  return (
    <div className="card card-body mb-3 display:flex, justifyContent: flex-end">
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <h4>{nimi}</h4>
        <button className="button_left" onClick={onShowClick.bind(this)}>
          ...
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          className="btn-group mr-2 text-right"
          role="group"
          aria-label="Second group"
        >
          <button
            className="button_right"
            onClick={onDeleteClick.bind(this, { id })}
          >
            Poista
          </button>
          <Link to={`puhelintieto/muokkaa/${id}`}>
            <button className="button_right">Muokkaa</button>
          </Link>
        </div>
      </div>
      {naytaPuhelintieto ? (
        <ul className="list-group">
          <li className="list-group-item">Puhelin: {puhelin}</li>
        </ul>
      ) : null}
    </div>
  );
};
/*Puhelintieto.propTypes = {
yhteystieto: PropTypes.object.isRequired,
//deleteClickHandler: PropTypes.func.isRequired,//ei tarvita enää
};*/
export default Puhelintieto;
