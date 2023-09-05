import React from "react";
import MenuItem from "@mui/material/MenuItem";

const cancerDiagnosisOptions = [
  "Acute Lymphoblastic Leukemia (ALL)",
  "Acute Myeloid Leukemia (AML)",
  "Adolescents, Cancer in",
  "Adrenocortical Carcinoma",
  "AIDS-Related Kaposi Sarcoma",
  "AIDS-Related Lymphoma (Lymphoma)",
  "Primary CNS Lymphoma (Lymphoma)",
  "Anal Cancer",
  "Appendix Cancer",
  "Astrocytomas, Childhood (Brain Cancer)",
  "Basal Cell Carcinoma of the Skin",
  "Bile Duct Cancer",
  "Bladder Cancer",
  "Bone Cancer",
  "Brain Tumors",
  "Burkitt Lymphoma",
  "Breast Cancer - female",
  "Breast Cancer - male",
  "Breast Cancer - pregnancy associated",
  "Carcinoma of Unknown Primary",
  "Central Nervous System - Primary CNS Lymphoma",
  "Cervical Cancer",
  "Cholangiocarcinoma",
  "Chronic Lymphocytic Leukemia",
  "Chronic Myelogenous Leukemia",
  "Chronic Myeloproliferative Neoplasms",
  "Colorectal Cancer",
  "Cutaneous T-Cell Lymphoma",
  "Endometrial Cancer",
  "Esophageal Cancer",
  "Esthesioneuroblastoma",
  "Ewing Sarcoma (Bone Cancer)",
  "Extragonadal Germ Cell Tumor",
  "Eye - Intraocular Melanoma",
  "Wye - Retinoblastoma",
  "Fallopian Tube Cancer",
  "Gallbladder Cancer",
  "Gastric (Stomach) Cancer",
  "Gastrointestinal Neuroendocrine Tumors",
  "Germ Cell - Extragonadal Germ Cell Tumors",
  "Germ Cell - Ovarian Germ Cell Tumors",
  "Germ Cell - Testicular Cancer",
  "Gestational Trophoblastic Disease",
  "Hairy Cell Leukemia",
  "Hepatocellular (Liver) Cancer",
  "Histiocytosis, Langerhans Cell",
  "Hodgkin Lymphoma",
  "Intraocular Melanoma",
  "Kidney (Renal Cell) Cancer",
  "Langerhans Cell Histiocytosis",
  "Laryngeal Cancer",
  "Leukemia",
  "Lip and Oral Cavity Cancer",
  "Liver Cancer",
  "Lung Cancer",
  "Lung Cancer - Bronchial Tumors",
  "Lung Cancer - Non-Small Cell",
  "Lung Cancer - Pleuropulmonary Blastoma",
  "Lung Cancer - Pulmonary Inflammatory Myofibroblastic Tumor",
  "Lung Cancer - Small Cell",
  "Lung Cancer - Tracheobronchial Tumors",
  "Lymphoma",
  "Malignant Fibrous Histiocytoma",
  "Melanoma",
  "Melanoma, Intraocular (Eye)",
  "Merkel Cell Carcinoma (Skin Cancer)",
  "Mesothelioma, Malignant",
  "Metastatic Cancer",
  "Metastatic Squamous Neck Cancer with Occult Primary",
  "Midline Tract Carcinoma With NUT Gene Changes",
  "Mouth Cancer",
  "Multiple Endocrine Neoplasia Syndromes",
  "Multiple Myeloma/Plasma Cell Neoplasms",
  "Mycosis Fungoides (Lymphoma)",
  "Myelodysplastic Neoplasms",
  "Myelodysplastic Syndromes",
  "Myelogenous Leukemia, Chronic (CML)",
  "Myeloproliferative Neoplasms, Chronic",
  "Nasal Cavity and Paranasal Sinus Cancer",
  "Nasopharyngeal Cancer",
  "Neuroblastoma",
  "Non-Hodgkin Lymphoma",
  "Oral Cancer",
  "Undifferentiated Pleomorphic Sarcoma of Bone Treatment",
  "Osteosarcoma",
  "Ovarian Cancer",
  "Pancreatic Cancer",
  "Pancreatic Neuroendocrine Tumors (Islet Cell Tumors)",
  "Papillomatosis (Childhood Laryngeal)",
  "Paraganglioma",
  "Paranasal Sinus and Nasal Cavity Cancer",
  "Parathyroid Cancer",
  "Penile Cancer",
  "Pharyngeal Cancer",
  "Pheochromocytoma",
  "Pituitary Tumor",
  "Plasma Cell Neoplasm/Multiple Myeloma",
  "Primary Central Nervous System (CNS) Lymphoma",
  "Primary Peritoneal Cancer",
  "Prostate Cancer",
  "Rectal Cancer",
  "Recurrent Cancer",
  "Renal Cell (Kidney) Cancer",
  "Retinoblastoma",
  "Salivary Gland Cancer",
  "Uterine Sarcoma",
  "Sézary Syndrome (Lymphoma)",
  "Skin Cancer",
  "Small Intestine Cancer",
  "Soft Tissue Sarcoma - Gastrointestinal Stromal Tumors (GIST)",
  "Soft Tissue Sarcoma - Vascular Tumors ",
  "Squamous Cell Carcinoma of the Skin",
  "Squamous Neck Cancer with Occult Primary, Metastatic",
  "Stomach (Gastric) Cancer",
  "T-Cell Lymphoma, Cutaneous",
  "Testicular Cancer",
  "Throat Cancer",
  "Nasopharyngeal Cancer",
  "Oropharyngeal Cancer",
  "Hypopharyngeal Cancer",
  "Thymoma and Thymic Carcinoma",
  "Thyroid Cancer",
  "Transitional Cell Cancer of the Renal Pelvis",
  "Unknown Primary, Carcinoma of",
  "Urethral Cancer",
  "Uterine Cancer, Endometrial",
  "Uterine Sarcoma",
  "Vaginal Cancer",
  "Vulvar Cancer",
  "Wilms Tumor",
  "Young Adults, Cancer in",
].map((option, index) => {
  return {
    label: option,
    id: index,
  };
});

export const cancerDiag = cancerDiagnosisOptions.map((option, index) => {
  return {
    ...option,
    firstLetter: (() => {
      const firstLetter = option.label[0].toUpperCase();
      return /[0-9]/.test(firstLetter) ? "0-9" : firstLetter;
    })(),
  };
});

export const housingOptions = [
  "1-Room HDB",
  "2-Room HDB",
  "3-Room HDB ",
  "4-Room HDB",
  "5-Room HDB and up",
  "DBSS Flat",
  "Executive Condominiums HDB",
  "Terrace House HDB",
  "Private Condominium",
  "Apartment",
  "Private Landed",
].map((option) => (
  <MenuItem key={option} value={option}>
    {option}
  </MenuItem>
));
export const familyCompositionOptions = [
  "Alone",
  "In public facility",
  "With spouse only",
  "With children only",
  "With spouse & children",
].map((option) => (
  <MenuItem key={option} value={option}>
    {option}
  </MenuItem>
));

export const workStatusOptions = [
  "Employed - Part Time",
  "Employed - Full Time",
  "Employed - Freelance",
  "Self Employed",
  "Unemployed",
  "Unpaid Leave",
  "Paid Leave",
].map((option) => (
  <MenuItem key={option} value={option}>
    {option}
  </MenuItem>
));

// add radio button current or last
export const occupationOptions = [
  "Legislator, Senior Officials and Managers",
  "Professional",
  "Associate Professionals and Technicians",
  "Clerical Support Worker",
  "Service and Sales Worker",
  "Agricultural and Fishery Worker",
  "Craftsmen and Related Trades Worker",
  "Plant and Machine Operator & Assembler",
  "Packer",
  "Hawker",
  "Cleaner, Labourer and Related Worker",
  "Manager",
  "Executive",
  "Self-employed",
  "Technician",
]
  .sort()
  .map((option) => (
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
  "1-2 years",
  "2 years and above",
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
