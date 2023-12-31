import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

const Inputs = () => {
  const [radioValue, setRadioValue] = useState("meet_with_meet");
  const [checkboxValue, setCheckboxValue] = useState("meet_with_meet");

  return (
    <section className={`py-10`}>
      <div className="container space-y-3">
        {/* Default Customization */}
        <div className="meet_with_dc">
          <label>Meet With</label>
          <div className="meet_with_box_wrapper">
            <label className="meet_with_box" htmlFor="meet_with_meet_radio">
              <img src="/images/icons/meet.svg" alt="" />
              <span className="title">Google Meet</span>
              <input
                type="radio"
                name="meet_with"
                id="meet_with_meet_radio"
                value="meet_with_meet"
                checked={radioValue === "meet_with_meet"}
                onClick={(e) => setRadioValue(e.currentTarget.value)}
              />
            </label>
            <label className="meet_with_box" htmlFor="meet_with_zoom_radio">
              <img src="/images/icons/zoom.svg" alt="" />
              <span className="title">Zoom</span>
              <input
                type="radio"
                name="meet_with"
                id="meet_with_zoom_radio"
                value="meet_with_zoom"
                checked={radioValue === "meet_with_zoom"}
                onClick={(e) => setRadioValue(e.currentTarget.value)}
              />
            </label>
          </div>
        </div>
        <div className="meet_with_dc">
          <label>Meet With</label>
          <div className="meet_with_box_wrapper">
            <label className="meet_with_box" htmlFor="meet_with_meet_checkbox">
              <img src="/images/icons/meet.svg" alt="" />
              <span className="title">Google Meet</span>
              <input
                type="checkbox"
                name="meet_with"
                id="meet_with_meet_checkbox"
                value="meet_with_meet"
                checked={checkboxValue === "meet_with_meet"}
                onClick={(e) => setCheckboxValue(e.currentTarget.value)}
              />
            </label>
            <label className="meet_with_box" htmlFor="meet_with_zoom_checkbox">
              <img src="/images/icons/zoom.svg" alt="" />
              <span className="title">Zoom</span>
              <input
                type="checkbox"
                name="meet_with"
                id="meet_with_zoom_checkbox"
                value="meet_with_zoom"
                checked={checkboxValue === "meet_with_zoom"}
                onClick={(e) => setCheckboxValue(e.currentTarget.value)}
              />
            </label>
          </div>
        </div>
        <div className="destination">
          <label htmlFor="destination">Destination</label>
          <select name="destination">
            <option selected disabled value="">
              Select
            </option>
            <option value="dhaka">Dhaka</option>
            <option value="kolkata">Kolkata</option>
          </select>
        </div>

        {/* Manual Customization */}
        <div className="meet_with_mc">
          <label>Meet With</label>
          <div className="meet_with_box_wrapper">
            <label className="meet_with_box" htmlFor="meet_with_meet_checkbox">
              <img src="/images/icons/meet.svg" alt="" />
              <span className="title">Google Meet</span>
              <span className="checkbox_icon_wrapper">
                <input
                  type="checkbox"
                  name="meet_with"
                  id="meet_with_meet_checkbox"
                  value="meet_with_meet"
                  checked={checkboxValue === "meet_with_meet"}
                  onClick={(e) => setCheckboxValue(e.currentTarget.value)}
                />
                <span className="checkbox_icon">
                  <FaCheck />
                </span>
              </span>
            </label>
            <label className="meet_with_box" htmlFor="meet_with_zoom_checkbox">
              <img src="/images/icons/zoom.svg" alt="" />
              <span className="title">Zoom</span>
              <span className="checkbox_icon_wrapper">
                <input
                  type="checkbox"
                  name="meet_with"
                  id="meet_with_zoom_checkbox"
                  value="meet_with_zoom"
                  checked={checkboxValue === "meet_with_zoom"}
                  onClick={(e) => setCheckboxValue(e.currentTarget.value)}
                />
                <span className="checkbox_icon">
                  <FaCheck />
                </span>
              </span>
            </label>
          </div>
        </div>
        <ul className="custom_select">
          <li>
            <input
              className="select_close"
              type="radio"
              name="destination"
              id="select_close"
              value=""
            />
            <span className="select_label select_label_placeholder">
              Select
            </span>
          </li>
          <li className="select_items">
            <input
              className="select_expand"
              type="radio"
              name="destination"
              id="select_expand"
            />
            <label
              className="select_close_label"
              htmlFor="select_close"
            ></label>
            <ul className="select_options">
              <li className="select_option">
                <input
                  className="select_input"
                  type="radio"
                  name="destination"
                  id="destination_dhaka"
                />
                <label className="select_label" htmlFor="destination_dhaka">
                  Dhaka
                </label>
              </li>
              <li className="select_option">
                <input
                  className="select_input"
                  type="radio"
                  name="destination"
                  id="destination_india"
                />
                <label className="select_label" htmlFor="destination_india">
                  India
                </label>
              </li>
            </ul>
            <label
              className="select_expand_label"
              htmlFor="select_expand"
            ></label>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Inputs;
