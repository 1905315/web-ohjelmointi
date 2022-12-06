import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import yhteystiedotContext from "../context/YhteystiedotContext";
const MuokkaaPuhelintieto = () => {
  const [nimi, setNimi] = useState("");
  const [puhelin, setPuhelin] = useState("");
  const [list, setList] = useState([]);
  const YhteystiedotContext = useContext(yhteystiedotContext); //hooks
  const { id } = useParams();

  let history = useNavigate();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const yhteystieto = YhteystiedotContext.getYhteystieto(id).then((res) => {
        setNimi(res.nimi);
        setPuhelin(res.puhelin);
      });
    } else mounted = false;
  }, []);

  const handleSubmit = async (e) => {
    const paivitettyPuhelintieto = {
      nimi: nimi,
      puhelin: puhelin,
    };

    YhteystiedotContext.setYhteystieto(id, paivitettyPuhelintieto);
    history("/");
  };
  const onChangeNimi = (e) => {
    setNimi(e.target.value);
  };
  const onChangePuhelin = (e) => {
    setPuhelin(e.target.value);
  };
  return (
    <div className="card mb-3">
      <div className="card-header">Muokkaa puhelintieto</div>

      <div className="card-body">
        <form onSubmit={handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="nimi">Nimi</label>
            <input
              type="text"
              name="nimi"
              className="form-control form-control-lg"
              placeholder="Syötä nimi..."
              value={nimi}
              onChange={onChangeNimi}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nimi">Puhelin</label>
            <input
              type="text"
              name="puhelin"
              className="form-control form-control-lg"
              placeholder="Syötä puhelin..."
              value={puhelin}
              onChange={onChangePuhelin}
            />
          </div>
          <input
            type="submit"
            value="Muokkaa puhelintieto"
            className="btn btn-light btn-block"
          />
        </form>
      </div>
    </div>
  );
};
export default MuokkaaPuhelintieto;
