import React from "react";
import MenuItem from "@mui/material/MenuItem";

export const cancerDiagnosisOptions = [
  "Breast",
  "Brain",
  "Lung",
  "Colon & Rectum",
  "Prostate",
  "Head & Neck",
  "Others",
].map((option) => (
  <MenuItem key={option} value={option}>
    {option}
  </MenuItem>
));

export const housingOptions = [
  "HDB 1 Room",
  "HDB 2 Room",
  "HDB 3 Room",
  "HDB 4 Room",
  "HDB 5 Room",
  "HDB Executive & Above",
  "Private Condo",
  "Private Landed",
  "Others",
].map((option) => (
  <MenuItem key={option} value={option}>
    {option}
  </MenuItem>
));
export const familyCompositionOptions = [
  "Alone",
  "w/spouse only",
  "w/children only",
  "w/ spouse & children",
  "Others",
].map((option) => (
  <MenuItem key={option} value={option}>
    {option}
  </MenuItem>
));
export const workStatusOptions = [
  "Employed",
  "Unemployed",
  "Unpaid Leave",
  "Paid Leave",
  "Others",
].map((option) => (
  <MenuItem key={option} value={option}>
    {option}
  </MenuItem>
));
export const occupationOptions = [
  "Current General Worker Cleaner",
  "Current General Worker Packer",
  "Current General Worker Hawker",
  "Current Services & Sales",
  "Current Admin & Clerical",
  "Current PMET",
  "Last General Worker Cleaner",
  "Last General Worker Packer",
  "Last General Worker Hawker",
  "Last Services & Sales",
  "Last Admin & Clerical",
  "Last PMET",
  "Others",
].map((option) => (
  <MenuItem key={option} value={option}>
    {option}
  </MenuItem>
));
export const incomeOptions = [
  "Less than $1,000",
  "$1,000 to $2,000",
  "$2,001 to $3,000",
  "$3,001 to $4,000",
  "$4,001 to $5,000",
  "$5,001 to $6,000",
  "$6,001 to $7,000",
  "$7,001 to $8,000",
  "$8,001 to $9,000",
  "$9,001 to $10,000",
  "Above $10,000",
].map((option) => (
  <MenuItem key={option} value={option}>
    {option}
  </MenuItem>
));
export const impactOnFinancesOptions = [
  "Not at all",
  "A little",
  "Some",
  "A lot",
  "Don't Know",
  "Refused",
];
export const timePeriodOptions = [
  "3 months",
  "6 months",
  "9 months",
  "12 months",
  "Not Applicable",
  "Others",
].map((option) => (
  <MenuItem key={option} value={option}>
    {option}
  </MenuItem>
));

export const scaleOptions = Array.from({ length: 11 }, (_, index) => (
  <MenuItem key={index} value={index.toString()}>
    {index}
  </MenuItem>
));

export const nullOption = <MenuItem value="null"></MenuItem>;

export const healthStatusOptions = [
  "Excellent",
  "Very Good",
  "Good",
  "Fair",
  "Poor",
].map((option) => (
  <MenuItem key={option} value={option}>
    {option}
  </MenuItem>
));
export const distressOptions = [
  "Not at all",
  "Slightly",
  "Moderately",
  "Quite a bit",
  "Extremely",
].map((option) => (
  <MenuItem key={option} value={option}>
    {option}
  </MenuItem>
));