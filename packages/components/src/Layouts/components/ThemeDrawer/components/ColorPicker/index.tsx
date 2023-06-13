import { useState } from "react";
import { Input } from "antd";
import { isHexColor } from "utils";
import { convertToSixDigitHexColor } from "utils";
import { HexColorPicker } from "react-colorful";
import { setGlobalState } from "store";
import { useAppDispatch, useAppSelector } from "hooks";
import "./index.less";

const ColorPicker = () => {
  const dispatch = useAppDispatch();
  const { primary } = useAppSelector(state => state.global);
  const [inputPrimary, setInputPrimary] = useState(primary);

  const changePrimary = (value: string) => {
    dispatch(setGlobalState({ key: "primary", value }));
  };

  const presetColors = [
    "#1677FF",
    "#00B96B",
    "#E0282E",
    "#DAA96E",
    "#0C819F",
    "#409EFF",
    "#FF5C93",
    "#E74C3C",
    "#27AE60",
    "#FD726D",
    "#F39C12",
    "#9B59B6"
  ];

  return (
    <div className="color-picker">
      <HexColorPicker
        color={primary}
        onChange={e => {
          changePrimary(e.toLocaleUpperCase());
          setInputPrimary(e.toLocaleUpperCase());
        }}
      />
      <Input
        value={inputPrimary}
        className="picker-input"
        addonBefore="HEX"
        onChange={e => setInputPrimary(e.target.value)}
        onBlur={e => {
          if (isHexColor(e.target.value)) {
            let value = e.target.value;
            if (e.target.value[0] !== "#") value = `#${e.target.value}`;
            changePrimary(convertToSixDigitHexColor(value));
            setInputPrimary(convertToSixDigitHexColor(value));
          }
        }}
      />
      <div className="picker-swatches">
        {presetColors.map(presetColor => (
          <button
            className="picker-swatch"
            key={presetColor}
            style={{ background: presetColor }}
            onClick={() => {
              changePrimary(presetColor);
              setInputPrimary(presetColor);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
