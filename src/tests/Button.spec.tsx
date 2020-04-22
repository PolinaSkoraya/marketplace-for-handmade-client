import React from "react";
import { create } from "react-test-renderer";
import Button from "../components/Button/Button";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Good from "../components/Good/Good";
import GoodsStore from "../stores/GoodsStore";

// let container;

// beforeEach(() => {
//     container = document.createElement("div");
//     document.body.appendChild(container);
// });
//
// afterEach(() => {
//     unmountComponentAtNode(container);
//     container.remove();
//     container = null;
// });

describe("Button component", () => {
  test("Matches the snapshot", () => {
    const button = create(<Button styleType="small" />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});

it("api test", async function () {
  const store = new GoodsStore();
  const numberOfPages = await store.loadGoods(1);

  expect(numberOfPages).toEqual(2);
  expect(store.goods[0].name).toEqual("Guinea-pig");
});
