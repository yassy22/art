// App.js
import "../../App.css";
import { Form, redirect } from "react-router-dom";
import { useState } from "react";
import Slider from "../../components/art/Slider";
import CosmosContainer from "../../components/art/CosmosContainer";
import { createArtworks } from "../../services/artworks";
import { getAuthData } from "../../services/auth";

const loader = async ({ request }) => {
  const { user } = getAuthData();
  if (!user) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/auth/login?" + params.toString());
  }
  return null;
};
const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log("formdata", data);
  await createArtworks(data);
  return redirect(`/`);
};

function CreateArtwork() {
  const [style, setStyle] = useState({
    radiusCircle: 10,
    radiusStars: 2,
    circleCount: 0,
    circleColor: "#c3ccdb",
    numLines: 30,
    lineWidht: 0.1,
    id: crypto.getRandomValues(new Uint32Array(1))[0],
  });

  const [items, setItems] = useState([]);
  const [titleError, setTitleError] = useState("");

  const from_styel = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const from__titile__container = {
    paddingBottom: "10px",
  };

  const generateItem = () => ({
    x1: Math.random() * 800,
    y1: Math.random() * 800,
    x2: Math.random() * 800,
    y2: Math.random() * 800,
    cx1: Math.random() * 800,
    cy1: Math.random() * 800,
    id: crypto.getRandomValues(new Uint32Array(1))[0],
  });

  const [title, setTitle] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    if (titleError) setTitleError("");
  };

  const handleRadiusChange = (radiusCircle) => {
    setStyle({ ...style, radiusCircle });
    console.log("radiusCircle", radiusCircle);
  };

  const handleChannelChange = (circleCount) => {
    setStyle({ ...style, circleCount });
  };

  const handleLineWidhtChange = (lineWidht) => {
    setStyle({ ...style, lineWidht });
  };

  const handelChangeEtoile = (radiusStars) => {
    setStyle({ ...style, radiusStars });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    setItems([...items, generateItem()]);
  };

  const handleRemoveItem = (e) => {
    e.preventDefault();
    setItems(items.slice(0, -1));
  };

  const {
    radiusCircle,
    radiusStars,
    circleCount,
    circleColor,
    numLines,
    lineWidht,
  } = style;

  // console.log("items", style);
  return (
    <div className="App">
      <div className="container">
        <div className="controls">
          <h1 className="title">cosmos</h1>
          <Form method="POST">
            <div style={from__titile__container}>
              <input
                style={from_styel}
                name="title"
                placeholder="Geef een naam"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>
            {titleError && <div className="error">{titleError}</div>}{" "}
            {/* Display error message if any */}
            <input type="hidden" name="items" value={JSON.stringify(items)} />
            <input type="hidden" name="style" value={JSON.stringify(style)} />
            <div>
              <Slider
                max={33}
                label="Add circle"
                value={circleCount}
                onValueChange={handleChannelChange}
                className="slider"
              />

              <Slider
                max={100}
                label="Make circle biger"
                value={radiusCircle}
                onValueChange={handleRadiusChange}
              />

              <Slider
                max={100}
                label="Line widht"
                value={lineWidht}
                onValueChange={handleLineWidhtChange}
                className="slider"
              />

              <Slider
                max={50}
                label="Let the etoils shine"
                value={radiusStars}
                onValueChange={handelChangeEtoile}
                className="slider"
              />
            </div>
            <div className="amount_etoil">
              <label htmlFor="">Add or remove etoils</label>
              <div className="buttons">
                <button className="AddButton button" onClick={handleAddItem}>
                  +
                </button>
                <button
                  className="removeButton button"
                  onClick={handleRemoveItem}
                >
                  {" "}
                  -{" "}
                </button>
              </div>
            </div>
            <div>
              <input
                type="submit"
                className="buttonStyle"
                value="Add a new artwork"
              />
            </div>
          </Form>
        </div>
        <div>
          <CosmosContainer
            numLines={numLines} // lijnen
            lineWidht={lineWidht} // lijnDikte
            circleCount={circleCount} // cirkels
            radiusCircle={radiusCircle} //raduis
            circleColor={circleColor} //kleur
            radiusStars={radiusStars} // cirkel straal
            items={items} // items
          />
        </div>
      </div>
    </div>
  );
}
CreateArtwork.action = action;
CreateArtwork.loader = loader;

export default CreateArtwork;
