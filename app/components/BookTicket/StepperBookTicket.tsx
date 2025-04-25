import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
const stepIcons: { [key: number]: React.ReactElement } = {
  1: <ConfirmationNumberIcon />,
  2: <LocalDrinkIcon />,
  3: <PaymentIcon />,
  4: <ReceiptIcon />,
};

const ColorStepIcon: React.FC<StepIconProps> = (props) => {
  const { active, completed, className, icon } = props;
  const stepIcon = stepIcons[Number(icon)];

  return (
    <div
      className={className}
      style={{
        backgroundColor: active || completed ? "#00eaff" : "#1e1e1e",
        borderRadius: "50%",
        padding: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: active || completed ? "0 0 8px #00eaff" : "0 0 4px #555",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {React.cloneElement(stepIcon, {
        style: {
          color: "#000",
        },
      })}
    </div>
  );
};

const CustomConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#00eaff",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const steps = ["Chọn Vé", "Bắp Nước", "Thanh Toán", "Thông Tin Vé"];
interface StepperBookTicketProps {
  stepBooking: number;
}
export default function StepperBookTicket({ stepBooking }: StepperBookTicketProps) {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#121212", // Nền tối
        py: 2,
        borderRadius: 2,
      }}
    >
      <Stepper activeStep={stepBooking} alternativeLabel connector={<CustomConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={ColorStepIcon}
              sx={{
                ".MuiStepLabel-label": {
                  color: "#ccc",
                  fontWeight: "500",
                  fontSize: "0.9rem",
                  "&.Mui-active": {
                    color: "#00eaff",
                    fontWeight: "bold",
                  },
                  "&.Mui-completed": {
                    color: "#00eaff",
                  },
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
