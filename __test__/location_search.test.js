import React from "react";
import { shallow } from "enzyme";

import LocationSearch from "../src/components/LocationSearch.js";

describe("Test LocationSearch component", () => {
  it("renders input search bar", () => {
    const wrapper = shallow(<LocationSearch />);
    expect(wrapper.find("input")).to.have.lengthOf(1);
  });
}); 
