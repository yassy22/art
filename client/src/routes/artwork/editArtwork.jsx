// App.js
import "../../App.css";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { useState } from "react";
import Slider from "../../components/art/Slider";
import CosmosContainer from "../../components/art/CosmosContainer";
import { getArtworkById, updateArtwork } from "../../services/artworks";
import { getAuthData } from "../../services/auth";

const loader = async ({ request, params }) => {
  const { user } = getAuthData();
  if (!user) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/auth/login?" + params.toString());
  }
  const artwork = await getArtworkById(params.id);
  if (user.id != artwork.user.data.id) {
    return redirect(`/artworks/${params.id}`);
  }
  return { artwork };
};

const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  await updateArtwork(params.id, data);
  return redirect(`/artworks/${params.id}`);
};

function EditArtwork() {
  const { artwork } = useLoaderData();
  console.log("artwork", artwork);
  console.log("artwork", artwork);
  const { style, items, title } = artwork;

  const [newStyle, setNewStyle] = useState({
    radiusCircle: style.radiusCircle,
    radiusStars: style.radiusStars,
    circleCount: style.circleCount,
    circleColor: style.circleColor,
    numLines: style.numLines,
    lineWidht: style.lineWidht,
  });

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

  const [newItems, setnewItems] = useState([...items]);
  const [newTitle, setNewTitle] = useState(title);

  const generateItem = () => ({
    x1: Math.random() * 800,
    y1: Math.random() * 800,
    x2: Math.random() * 800,
    y2: Math.random() * 800,
    cx1: Math.random() * 800,
    cy1: Math.random() * 800,
    id: crypto.getRandomValues(new Uint32Array(1))[0],
  });

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleRadiusChange = (radiusCircle) => {
    setNewStyle({ ...newStyle, radiusCircle });
    console.log("radiusCircle", radiusCircle);
  };

  const handleChannelChange = (circleCount) => {
    setNewStyle({ ...newStyle, circleCount });
  };

  const handleLineWidhtChange = (lineWidht) => {
    setNewStyle({ ...newStyle, lineWidht });
    console.log("lineWidht", lineWidht);
  };

  const handelChangeEtoile = (radiusStars) => {
    setNewStyle({ ...newStyle, radiusStars });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    setnewItems([...newItems, generateItem()]);
  };

  const handleRemoveItem = (e) => {
    e.preventDefault();
    setnewItems(newItems.slice(0, -1));
  };

  console.log("newItems", newTitle);

  const {
    radiusCircle,
    radiusStars,
    circleCount,
    circleColor,
    numLines,
    lineWidht,
  } = newStyle;

  return (
    <div className="App">
      <div className="container">
        <div className="controls">
          <h1 className="title">cosmos</h1>
          <Form method="POST">
            <div style={from__titile__container}>
              <input
                style={from_styel}
                className="titl__text"
                type="text"
                name="title"
                placeholder="Geef een naam"
                value={newTitle}
                onChange={handleTitleChange}
                required
              />
            </div>
            <input
              type="hidden"
              name="items"
              value={JSON.stringify(newItems)}
            />
            <input
              type="hidden"
              name="style"
              value={JSON.stringify(newStyle)}
            />

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
            radiusStars={radiusStars} //sterren
            items={newItems}
          />
        </div>
      </div>
    </div>
  );
}
EditArtwork.action = action;
EditArtwork.loader = loader;

export default EditArtwork;
