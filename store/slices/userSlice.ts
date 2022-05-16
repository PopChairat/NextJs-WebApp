// Implement from Redux toolkit
// Slices => Reducer + Action(ตัวเปลี่ยนแปลงค่า)
//เปลี่ยนแปลงค่า state/ เชื่อมต่อ server
import { UserData } from "@/models/user.model";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
//เอาทุก export ในไฟล์
import * as serverService from "@/services/serverService";

interface SingleProp {
  data: string;
}

interface UserState {
  username: string;
  accessToken: string;
  error?: string;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  user?: UserData;
}

interface SignUpAction {
  username: string;
  password: string;
}

const initialState: UserState = {
  username: "",
  accessToken: "",
  isAuthenticated: false,
  isAuthenticating: true,
  user: undefined,
};

//Async sign up
export const signUpAsync = createAsyncThunk(
  "user/signup", //action label show on redux devtool
  async (credential: SignUpAction) => {
    //ยิงไป server
    const response = await serverService.signUp(credential);
    return response;
    //mock
    // const p1 = new Promise((res) =>
    //   setTimeout(() => res({ result: "signup success" }), 1000)
    // );
    // return await p1;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    //เปลี่ยนแปลงค่า
    resetUsername: (state, action: PayloadAction<SingleProp>) => {
      state.username = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    //Action เปลี่ยนแปลงค่าแบบ Asnyc
    //fullfilled = complete/ rejected/ pending = processing

    builder.addCase(signUpAsync.fulfilled, (state, action) => {
      state.username = action.payload.result;
    });
  },
});

//export resetUsername
export const { resetUsername } = userSlice.actions;

// export common user selector
export const userSelector = (store: RootState) => store.user;
export const isAuthenticatedSelector = (store: RootState): boolean =>
  store.user.isAuthenticated;

export default userSlice.reducer;
