import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

describe("Application", () => {

  afterEach(cleanup);

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => 
   
    getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", () => {
    const { container } = render(<Application />);
    console.log(prettyDOM(container));
  })

it("changes the schedule when a new day is selected", () => {
    
  })

})

