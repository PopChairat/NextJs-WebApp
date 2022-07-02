import BackButton from "@/components/inputs/BackButton";
import PageContainer from "@/components/layouts/PageContainer";
import {
  Box,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import PrimaryButton from "@/components/inputs/PrimaryButton";
import { Ladybug } from "@/public/constants/color.constant";

export default function cardScannerIntro() {
  const [isPageLoading, setIsPageLoading]: [boolean, Function] =
    useState(false);
  const router = useRouter();
  const [cardType, setCardType] = React.useState<string | null>("ThaiCard");
  const [isAllowCamera, setIsAllowCamera]: [boolean, Function] = useState(true);
  const handleCardType = (
    event: React.MouseEvent<HTMLElement>,
    newCardType: string | null
  ) => {
    setCardType(newCardType);
  };

  return (
    <PageContainer
      pageName="Ekyc intro"
      loading={isPageLoading}
      loadingMessage="Redirecting..."
    >
      <BackButton />

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mx: "5vw" }}
      >
        <Typography
          fontWeight="bold"
          textAlign="center"
          variant="h1"
          sx={{ mx: "5vw", mt: "5vh" }}
        >
          สแกนบัตรประชาชน
        </Typography>
        <ToggleButtonGroup
          value={cardType}
          exclusive
          onChange={handleCardType}
          sx={{ mt: "2vh" }}
        >
          <ToggleButton value="ThaiCard">
            <Typography textAlign="center" fontWeight="bold" variant="h3">
              ไทย
            </Typography>
          </ToggleButton>

          <ToggleButton value="ForeignCard">
            <Typography textAlign="center" fontWeight="bold" variant="h3">
              Foreigner
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="start"
          width="100%"
        >
          <Typography
            sx={{ mt: 3 }}
            textAlign="start"
            fontWeight="bold"
            variant="h3"
          >
            ขั้นตอนการแสกนบัตร
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{ mt: 3, ml: 3 }}
          >
            <CheckIcon color="primary" />
            <Typography variant="body1">ต้องสามารถเห็นได้ชัดเจน</Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{ my: 1, ml: 3 }}
          >
            <CheckIcon color="primary" />
            <Typography variant="body1">มีแสงสว่างเพียงพอ</Typography>
          </Stack>
        </Box>
        <Stack width="100%" sx={{ mt: "4vh" }}>
          {isAllowCamera == false ? (
            <Grid
              item
              xs={12}
              justifyContent="center"
              alignItems="center"
              display="flex"
              sx={{ mb: 2 }}
            >
              <Typography variant="h4" color={Ladybug}>
                ไม่สามารถยืนยันตัวตนได้ถ้าไม่อนุญาติใช้กล้อง
              </Typography>
            </Grid>
          ) : null}
          <PrimaryButton
            onClick={() => {
              navigator.mediaDevices
                .getUserMedia({ audio: false, video: true })
                .then(
                  (stream) => {
                    // camera available
                    setIsPageLoading(true);
                    router.push("/ekyc/cardScanner");
                    setIsPageLoading(false);
                  },
                  (e) => {
                    // camera not available
                    setIsAllowCamera(false);
                  }
                );
            }}
          >
            สแกนบัตร
          </PrimaryButton>
        </Stack>
      </Box>
    </PageContainer>
  );
}