import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
