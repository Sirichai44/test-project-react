import React, { useState } from "react";
import { Select } from "antd";
import { Link } from "react-router-dom";
import "./Test1.css";
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

const Test1 = () => {

  const { t } = useTranslation();
  const handleChangeLanguage = (value) => {
    i18n.changeLanguage(value);
  };

  
  const divs = [
    <div className="boxt"><div className="circle"></div></div>,
    <div className="boxt"><div className="oval"></div></div>,
    <div className="boxt"><div className="trapezoid"></div></div>,
    <div className="boxt"><div className="rectangle"></div></div>,
    <div className="boxt"><div className="parallelogram"></div></div>,
    <div className="boxt"><div className="square"></div></div>,
  ];
  const [startIndex, setStartIndex] = useState(0);

  const handlePrevious = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % divs.length);
  };

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? divs.length - 1 : prevIndex - 1
    );
  };

  const handleShuffle = () => {
    setStartIndex(Math.floor(Math.random() * divs.length));
  };

  const renderDivs = () => {
    const loopDivs = [...divs, ...divs, ...divs];
    const startIndexFirstRow = startIndex % divs.length;
    const startIndexSecondRow = (startIndex + 3) % divs.length;
    const firstRowDivs = loopDivs.slice(
      startIndexFirstRow,
      startIndexFirstRow + 3
    );
    const secondRowDivs = loopDivs.slice(
      startIndexSecondRow,
      startIndexSecondRow + 3
    );
    return (
      <React.Fragment>
        <div className="carousel-row1" id="carousel-row1">{firstRowDivs}</div>
        <div className="carousel-row2" id="carousel-row2">{secondRowDivs}</div>
      </React.Fragment>
    );
  };

  return (
    <div className="container">
      <h1>{t('Layout & Style')}</h1>
      <div id="top">
        <div className="panel">
          <div className="boxt boxt1" onClick={handlePrevious}>
            <p className="t1">{t('Move shape')}</p>
            <div className="triangle-left"></div>
          </div>

          <div>
            <div
              className="boxt boxt2"
              onClick={() => {
                const box1 = document.getElementById("carousel-row1");
                const box2 = document.getElementById("carousel-row2");
                if (box1.classList.contains("carousel-row1")) {
                  box1.classList.remove("carousel-row1");
                  box1.classList.add("carousel-row1-active");
                  box2.classList.remove("carousel-row2");
                  box2.classList.add("carousel-row2-active");
                } else {
                  box1.classList.remove("carousel-row1-active");
                  box1.classList.add("carousel-row1");
                  box2.classList.remove("carousel-row2-active");
                  box2.classList.add("carousel-row2");
                }
              }}
            >
              <p className="t2">{t('Move position')}</p>
              <div className="triangle-up"></div>
              <div className="triangle-down"></div>
            </div>
          </div>

          <div className="boxt boxt4" onClick={handleNext}>
            <p className="t1">{t('Move shape')}</p>
            <div className="triangle-right"></div>
          </div>
        </div>
      </div>
      <div className="carousel-content" onClick={handleShuffle}>{renderDivs()}</div>

      <div className="lang-c">
        <Select
          defaultValue="en"
          style={{
            width: 120,
          }}
          options={[
            {
              value: "en",
              label: "EN",
            },
            {
              value: "th",
              label: "TH",
            },
          ]}
          onChange={handleChangeLanguage}
        />
      </div>

      <div className="home-btn">
        <Link to="/">
          <div>
            <button className="home">Home</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Test1;
