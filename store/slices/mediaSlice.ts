import * as mediaService from "@/services/mediaService";
import { RootState } from "@/store/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Router from "next/router";

interface MediaState {
  error: string;
  kycIdImgB64: string;
  selfieImgb64: string;
}

const initialState: MediaState = {
  error: "",
  kycIdImgB64: "",
  selfieImgb64: "",
};

export const uploadIdKycImgAsync = createAsyncThunk(
  "media/uploadIdKycImgAsync ",
  async (reqImgB64: string) => {
    const response = await mediaService.uploadImgFormData(
      { base64Data: reqImgB64, fileName: "KycIdImg" },
      "/media/uploadKycIdImg"
    );
    return response;
  }
);
export const uploadPortraitEkycImgAsync = createAsyncThunk(
  "media/uploadPortraitEkycImgAsync ",
  async (reqImgB64: string) => {
    // let formDataImg = await imgB64toFormData(reqImgB64, `SelfieImg`);
    const response = await mediaService.uploadImgFormData(
      { base64Data: reqImgB64, fileName: "SelfieImg" },
      "/media/uploadPortraitImg"
    );
    return response;
  }
);

const mediaSlice = createSlice({
  name: "media",
  initialState: initialState,
  reducers: {
    //เปลี่ยนแปลงค่า
    setKycIdImgB64: (state, action: PayloadAction<string>) => {
      state.kycIdImgB64 = action.payload;
    },
    setSelfieImgb64: (state, action: PayloadAction<string>) => {
      state.selfieImgb64 = action.payload;
    },
  },
  extraReducers: (builder) => {
    //Action เปลี่ยนแปลงค่าแบบ Asnyc
    //fullfilled = complete/ rejected/ pending = processing
    builder.addCase(uploadIdKycImgAsync.fulfilled, (state, action) => {
      var res = action.payload;
      if (res?.isSuccess) {
        Router.push("/ekyc/faceRecognitionIntro");
      } else if (res?.isSuccess == false) {
        var _msg = res?.errors[0]?.message ?? "";
        state.error = _msg;
      }
    });

    builder.addCase(uploadPortraitEkycImgAsync.fulfilled, (state, action) => {
      var res = action.payload;
      if (res?.isSuccess) {
        Router.push("/ekyc/infoForm");
      } else if (res?.isSuccess == false) {
        var _msg = res?.errors[0]?.message ?? "";
        state.error = _msg;
      }
    });
  },
});

//export action
export const { setKycIdImgB64, setSelfieImgb64 } = mediaSlice.actions;

export const mediaSelector = (store: RootState) => store.media;

export default mediaSlice.reducer;
