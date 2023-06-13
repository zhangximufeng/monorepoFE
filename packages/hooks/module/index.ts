import { AppDispatch, RootState, TypedUseSelectorHook, useSelector, useDispatch } from "store";

import { useEcharts } from "./useEcharts";
import useTheme from "./useTheme";
import { message, notification, modal } from "./useMessage";

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch, useAppSelector, useEcharts, useTheme, message, notification, modal };
