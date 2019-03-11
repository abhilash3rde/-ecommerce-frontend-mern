import p1img from "../assets/images/P1SPF50_lg.png";
import p2img from "../assets/images/P2Sham_lg.png";
export const baseUrl =
  process.env.REACT_APP_SERVER_URL ||
  "http://localhost:3000" ||
  "https://maxxbio.herokuapp.com";

export const colors = {
  dark: "#333",
  lightGrey: "#ccc"
};
export const fonts = {
  mainfont: "SuisseReg, sans-serif"
};

export const selectStyle = {
  valueContainer: styles => ({
    ...styles,
    backgroundColor: "transparant",
    padding: 0
  }),
  control: (styles, { isFocused, isSelected }) => ({
    ...styles,
    minHeight: "50px",
    border: `1px solid ${colors.lightGrey}`,
    borderRadius: "0",
    backgroundColor: "transparant",
    paddingLeft: "0.8889rem ",
    boxShadow: isFocused ? 0 : 0,
    "&:hover": {
      border: `1px solid ${colors.lightGrey}`
    }
  }),
  input: styles => ({
    ...styles,
    fontSize: "1.6rem",
    "&:placeholder": {
      color: "rgba(65, 51, 183, 0.5)"
    }
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      fontFamily: fonts.mainfont,
      fontSize: "1.6rem",
      color: colors.dark,
      backgroundColor: "transparent",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "rgba(197, 192, 240, 0.25)"
      }
    };
  },
  singleValue: styles => ({
    ...styles,
    fontFamily: fonts.mainfont,
    fontSize: "1.6rem",
    color: colors.dark,
    fontWeight: "normal"
  }),
  placeholder: styles => ({
    ...styles,
    whiteSpace: "nowrap"
  }),
  dropdownIndicator: styles => ({
    ...styles,
    padding: "2px"
  }),
  indicatorSeparator: styles => ({
    ...styles,
    display: "none"
  }),
  menu: styles => ({
    ...styles,
    borderRadius: "0",
    border: `1px solid ${colors.lightGrey}`,
    marginTop: 0
  }),
  multiValueLabel: styles => ({
    ...styles,
    fontFamily: fonts.mainfont,
    fontSize: "1.6rem",
    color: colors.dark
  }),
  multiValue: styles => ({
    ...styles,
    border: `1px solid ${colors.lightGrey}`,
    borderRadius: "0",
    backgroundColor: "rgba(197, 192, 240, 0.25)",
    fontFamily: fonts.mainfont,
    fontSize: "1.6rem",
    color: colors.dark
  }),
  multiValueRemove: styles => ({
    ...styles,
    cursor: "pointer",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
      color: colors.dark
    }
  })
};

export const mainProducts = [
  {
    img: p1img || "http://via.placeholder.com/700x500",
    title: "Protective Body Lotion SPF50",
    link: "#",
    pId: "P1SPF50",
    desc: `Broad-spectrum moisturising sunscreen with high SPF50 protection—formulated to provide up to four hours’ water resistance—with a lightweight skin feel and refreshing aroma.`,
    basePrice: 3783,
    topIngredient: `Spearmint Leaf, Panthenol, Tocopherol`,
    ingredients: `Avobenzone (3% w/w) Homosalate (10% w/w) Octisalate (5% w/w) Octocrylene (8% w/w) INACTIVE INGREDIENTS: Water (Aqua), C12-15 Alkyl Benzoate, Triacontanyl PVP, Euphorbia Cerifera (Candelilla) Wax, Silica, PEG-15 Cocamine, Acrylates/Steareth-20 Methacrylate Copolymer, PEG-40 Stearate, Glyceryl Behenate, Panthenol, Lavandula Angustifolia (Lavender) Oil, Caprylyl Glycol, Mentha Viridis (Spearmint) Leaf Oil, Aloe Barbadensis Leaf Juice, Ammonium Acryloyldimethyltaurate/VP Copolymer, Caprylhydroxamic Acid, Glycerin, Citrus Medica Limonum (Lemon) Peel Oil, Persea Gratissima (Avocado) Oil, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Glycine Soja (Soybean) Oil, Methyl Glucose Sesquistearate, Tocopheryl Acetate, Daucus Carota (Carrot) Sativa Root Extract, Beta-Carotene, Tocopherol, Linalool, d-Limonene, Citral.`,
    sizes: [50, 150, 250],
    category: "Skin"
  },
  {
    img: p2img || "http://via.placeholder.com/700x500",
    title: "Colour Protection Shampoo",
    link: "#",
    pId: "P2Sham",
    desc: `A sulphate-free blend that cleanses hair gently without stripping colour. Hydrolyzed Oats and nourishing Provitamin B5 replenish and soften hair.`,
    basePrice: 2644,
    topIngredient: `Tangerine Rind, Panthenol, Hydrolyzed Oats`,
    ingredients: `Water (Aqua), Sodium Lauroamphoacetate, Sodium Methyl Cocoyl Taurate, Glycerin, Cetyl Betaine, Propylene Glycol, Citric Acid, Phenoxyethanol, Panthenol, Lauryl Betaine, Guar Hydroxypropyltrimonium Chloride, Hydrolyzed Oats, Sea Salt (Maris sal), Citrus Tangerina (Tangerine) Peel Oil, Lavandula Angustifolia (Lavender) Oil, Disodium EDTA, Mentha Citrata Leaf Extract, Ethylhexylglycerin, Foeniculum Vulgare (Fennel) Oil, Mentha Piperita (Peppermint) Oil, Rosmarinus Officinalis (Rosemary) Leaf Oil, Salvia Officinalis (Sage) Oil, Magnesium Nitrate, Potassium Sorbate, Sodium Benzoate, Benzoic Acid, Dehydroacetic Acid, Methylchloroisothiazolinone, Magnesium Chloride, Methylisothiazolinone, d-Limonene, Linalool.`,
    sizes: [200, 500],
    category: "hair"
  }
];

export const categoryList = [
  // "Oil Drops / Tinctures",
  // "Sprays",
  // "Skin Care",
  "Edibles",
  "Capsules",
  "Pets"
];

export const regionsList = [
  {
    name: "Oceania",
    data: "oceania"
  },
  {
    name: "North America",
    data: "north-america"
  },
  {
    name: "South America",
    data: "south-america"
  },
  // {
  //   name: "Americas",
  //   data: "americas"
  // },
  {
    name: "Europe",
    data: "europe"
  },
  {
    name: "Asia",
    data: "asia"
  }
];
export const countryList = [
  {
    title: "Afghanistan",
    code: "AF",
    region: "asia"
  },
  {
    title: "Ã…land Islands",
    code: "AX",
    region: "europe"
  },
  {
    title: "Albania",
    code: "AL",
    region: "europe"
  },
  {
    title: "Algeria",
    code: "DZ",
    region: "africa"
  },
  {
    title: "American Samoa",
    code: "AS",
    region: "oceania"
  },
  {
    title: "Andorra",
    code: "AD",
    region: "europe"
  },
  {
    title: "Angola",
    code: "AO",
    region: "africa"
  },
  {
    title: "Anguilla",
    code: "AI",
    region: "north-america"
  },
  {
    title: "Antigua and Barbuda",
    code: "AG",
    region: "north-america"
  },
  {
    title: "Argentina",
    code: "AR",
    region: "south-america"
  },
  {
    title: "Armenia",
    code: "AM",
    region: "asia"
  },
  {
    title: "Aruba",
    code: "AW",
    region: "north-america"
  },
  {
    title: "Australia",
    code: "AU",
    region: "oceania"
  },
  {
    title: "Austria",
    code: "AT",
    region: "europe"
  },
  {
    title: "Azerbaijan",
    code: "AZ",
    region: "asia"
  },
  {
    title: "Bahamas",
    code: "BS",
    region: "north-america"
  },
  {
    title: "Bahrain",
    code: "BH",
    region: "asia"
  },
  {
    title: "Bangladesh",
    code: "BD",
    region: "asia"
  },
  {
    title: "Barbados",
    code: "BB",
    region: "north-america"
  },
  {
    title: "Belarus",
    code: "BY",
    region: "europe"
  },
  {
    title: "Belgium",
    code: "BE",
    region: "europe"
  },
  {
    title: "Belize",
    code: "BZ",
    region: "north-america"
  },
  {
    title: "Benin",
    code: "BJ",
    region: "africa"
  },
  {
    title: "Bermuda",
    code: "BM",
    region: "north-america"
  },
  {
    title: "Bhutan",
    code: "BT",
    region: "asia"
  },
  {
    title: "Bolivia, Plurinational State of",
    code: "BO",
    region: "south-america"
  },
  {
    title: "Bonaire, Sint Eustatius and Saba",
    code: "BQ",
    region: "north-america"
  },
  {
    title: "Bosnia and Herzegovina",
    code: "BA",
    region: "europe"
  },
  {
    title: "Botswana",
    code: "BW",
    region: "africa"
  },
  {
    title: "Bouvet Island",
    code: "BV"
  },
  {
    title: "Brazil",
    code: "BR",
    region: "south-america"
  },
  {
    title: "British Indian Ocean Territory",
    code: "IO"
  },
  {
    title: "Brunei Darussalam",
    code: "BN",
    region: "Asia"
  },
  {
    title: "Bulgaria",
    code: "BG",
    region: "europe"
  },
  {
    title: "Burkina Faso",
    code: "BF",
    region: "africa"
  },
  {
    title: "Burundi",
    code: "BI",
    region: "africa"
  },
  {
    title: "Cambodia",
    code: "KH",
    region: "asia"
  },
  {
    title: "Cameroon",
    code: "CM",
    region: "africa"
  },
  {
    title: "Canada",
    code: "CA",
    region: "north-america"
  },
  {
    title: "Cape Verde",
    code: "CV",
    region: "africa"
  },
  {
    title: "Cayman Islands",
    code: "KY",
    region: "north-america"
  },
  {
    title: "Central African Republic",
    code: "CF",
    region: "africa"
  },
  {
    title: "Chad",
    code: "TD",
    region: "africa"
  },
  {
    title: "Chile",
    code: "CL",
    region: "south-america"
  },
  {
    title: "China",
    code: "CN",
    region: "asia"
  },
  {
    title: "Christmas Island",
    code: "CX",
    region: "asia"
  },
  {
    title: "Cocos (Keeling) Islands",
    code: "CC",
    region: "asia"
  },
  {
    title: "Colombia",
    code: "CO",
    region: "south-america"
  },
  {
    title: "Comoros",
    code: "KM",
    region: "africa"
  },
  {
    title: "Congo",
    code: "CG",
    region: "africa"
  },
  {
    title: "Congo, the Democratic Republic of the",
    code: "CD",
    region: "africa"
  },
  {
    title: "Cook Islands",
    code: "CK",
    region: "oceania"
  },
  {
    title: "Costa Rica",
    code: "CR",
    region: "north-america"
  },
  {
    title: "CÃ´te d'Ivoire",
    code: "CI",
    region: "africa"
  },
  {
    title: "Croatia",
    code: "HR",
    region: "europe"
  },
  {
    title: "Cuba",
    code: "CU",
    region: "north-america"
  },
  {
    title: "Cyprus",
    code: "CY",
    region: "asia"
  },
  {
    title: "Czech Republic",
    code: "CZ",
    region: "europe"
  },
  {
    title: "Denmark",
    code: "DK",
    region: "europe"
  },
  {
    title: "Djibouti",
    code: "DJ",
    region: "africa"
  },
  {
    title: "Dominica",
    code: "DM",
    region: "north-america"
  },
  {
    title: "Dominican Republic",
    code: "DO",
    region: "north-america"
  },
  {
    title: "Ecuador",
    code: "EC",
    region: "south-america"
  },
  {
    title: "Egypt",
    code: "EG",
    region: "africa"
  },
  {
    title: "El Salvador",
    code: "SV",
    region: "north-america"
  },
  {
    title: "Equatorial Guinea",
    code: "GQ",
    region: "africa"
  },
  {
    title: "Eritrea",
    code: "ER",
    region: "africa"
  },
  {
    title: "Estonia",
    code: "EE",
    region: "europe"
  },
  {
    title: "Ethiopia",
    code: "ET",
    region: "africa"
  },
  {
    title: "Falkland Islands (Malvinas)",
    code: "FK",
    region: "south-america"
  },
  {
    title: "Faroe Islands",
    code: "FO",
    region: "europe"
  },
  {
    title: "Fiji",
    code: "FJ",
    region: "oceania"
  },
  {
    title: "Finland",
    code: "FI",
    region: "europe"
  },
  {
    title: "France",
    code: "FR",
    region: "europe"
  },
  {
    title: "French Guiana",
    code: "GF",
    region: "south-america"
  },
  {
    title: "French Polynesia",
    code: "PF",
    region: "oceania"
  },
  {
    title: "French Southern Territories",
    code: "TF"
  },
  {
    title: "Gabon",
    code: "GA",
    region: "africa"
  },
  {
    title: "Gambia",
    code: "GM",
    region: "africa"
  },
  {
    title: "Georgia",
    code: "GE",
    region: "asia"
  },
  {
    title: "Germany",
    code: "DE",
    region: "europe"
  },
  {
    title: "Ghana",
    code: "GH",
    region: "africa"
  },
  {
    title: "Gibraltar",
    code: "GI",
    region: "europe"
  },
  {
    title: "Greece",
    code: "GR",
    region: "europe"
  },
  {
    title: "Greenland",
    code: "GL",
    region: "north-america"
  },
  {
    title: "Grenada",
    code: "GD",
    region: "north-america"
  },
  {
    title: "Guadeloupe",
    code: "GP",
    region: "north-america"
  },
  {
    title: "Guam",
    code: "GU",
    region: "oceania"
  },
  {
    title: "Guatemala",
    code: "GT",
    region: "north-america"
  },
  {
    title: "Guernsey",
    code: "GG",
    region: "europe"
  },
  {
    title: "Guinea",
    code: "GN",
    region: "africa"
  },
  {
    title: "Guinea-Bissau",
    code: "GW",
    region: "africa"
  },
  {
    title: "Guyana",
    code: "GY",
    region: "south-america"
  },
  {
    title: "Haiti",
    code: "HT",
    region: "north-america"
  },
  {
    title: "Holy See (Vatican City State)",
    code: "VA",
    region: "europe"
  },
  {
    title: "Honduras",
    code: "HN",
    region: "north-america"
  },
  {
    title: "Hong Kong",
    code: "HK",
    region: "asia"
  },
  {
    title: "Hungary",
    code: "HU",
    region: "europe"
  },
  {
    title: "Iceland",
    code: "IS",
    region: "europe"
  },
  {
    title: "India",
    code: "IN",
    region: "asia"
  },
  {
    title: "Indonesia",
    code: "ID",
    region: "asia"
  },
  {
    title: "Iran, Islamic Republic of",
    code: "IR",
    region: "Asia"
  },
  {
    title: "Iraq",
    code: "IQ",
    region: "asia"
  },
  {
    title: "Ireland",
    code: "IE",
    region: "europe"
  },
  {
    title: "Isle of Man",
    code: "IM",
    region: "europe"
  },
  {
    title: "Israel",
    code: "IL",
    region: "asia"
  },
  {
    title: "Italy",
    code: "IT",
    region: "europe"
  },
  {
    title: "Jamaica",
    code: "JM",
    region: "north-america"
  },
  {
    title: "Japan",
    code: "JP",
    region: "asia"
  },
  {
    title: "Jersey",
    code: "JE",
    region: "europe"
  },
  {
    title: "Jordan",
    code: "JO",
    region: "asia"
  },
  {
    title: "Kazakhstan",
    code: "KZ",
    region: "asia"
  },
  {
    title: "Kenya",
    code: "KE",
    region: "africa"
  },
  {
    title: "Kiribati",
    code: "KI",
    region: "oceania"
  },
  {
    title: "Korea, Democratic People's Republic of",
    code: "KP",
    region: "asia"
  },
  {
    title: "Korea, Republic of",
    code: "KR",
    region: "asia"
  },
  {
    title: "Kuwait",
    code: "KW",
    region: "asia"
  },
  {
    title: "Kyrgyzstan",
    code: "KG",
    region: "asia"
  },
  {
    title: "Lao People's Democratic Republic",
    code: "LA"
  },
  {
    title: "Latvia",
    code: "LV",
    region: "europe"
  },
  {
    title: "Lebanon",
    code: "LB",
    region: "asia"
  },
  {
    title: "Lesotho",
    code: "LS",
    region: "africa"
  },
  {
    title: "Liberia",
    code: "LR",
    region: "africa"
  },
  {
    title: "Libya",
    code: "LY",
    region: "africa"
  },
  {
    title: "Liechtenstein",
    code: "LI",
    region: "europe"
  },
  {
    title: "Lithuania",
    code: "LT",
    region: "europe"
  },
  {
    title: "Luxembourg",
    code: "LU",
    region: "europe"
  },
  {
    title: "Macao",
    code: "MO",
    region: "asia"
  },
  {
    title: "Macedonia, the Former Yugoslav Republic of",
    code: "MK",
    region: "europe"
  },
  {
    title: "Madagascar",
    code: "MG",
    region: "africa"
  },
  {
    title: "Malawi",
    code: "MW",
    region: "africa"
  },
  {
    title: "Malaysia",
    code: "MY",
    region: "asia"
  },
  {
    title: "Maldives",
    code: "MV",
    region: "asia"
  },
  {
    title: "Mali",
    code: "ML",
    region: "africa"
  },
  {
    title: "Malta",
    code: "MT",
    region: "europe"
  },
  {
    title: "Marshall Islands",
    code: "MH",
    region: "oceania"
  },
  {
    title: "Martinique",
    code: "MQ",
    region: "north-america"
  },
  {
    title: "Mauritania",
    code: "MR",
    region: "africa"
  },
  {
    title: "Mauritius",
    code: "MU",
    region: "africa"
  },
  {
    title: "Mayotte",
    code: "YT",
    region: "africa"
  },
  {
    title: "Mexico",
    code: "MX",
    region: "north-america"
  },
  {
    title: "Micronesia, Federated States of",
    code: "FM",
    region: "oceania"
  },
  {
    title: "Moldova, Republic of",
    code: "MD",
    region: "europe"
  },
  {
    title: "Monaco",
    code: "MC",
    region: "europe"
  },
  {
    title: "Mongolia",
    code: "MN",
    region: "asia"
  },
  {
    title: "Montenegro",
    code: "ME",
    region: "europe"
  },
  {
    title: "Montserrat",
    code: "MS",
    region: "north-america"
  },
  {
    title: "Morocco",
    code: "MA",
    region: "africa"
  },
  {
    title: "Mozambique",
    code: "MZ",
    region: "africa"
  },
  {
    title: "Myanmar",
    code: "MM",
    region: "asia"
  },
  {
    title: "Namibia",
    code: "NA",
    region: "africa"
  },
  {
    title: "Nauru",
    code: "NR",
    region: "oceania"
  },
  {
    title: "Nepal",
    code: "NP",
    region: "asia"
  },
  {
    title: "Netherlands",
    code: "NL",
    region: "europe"
  },
  {
    title: "New Caledonia",
    code: "NC",
    region: "oceania"
  },
  {
    title: "New Zealand",
    code: "NZ",
    region: "oceania"
  },
  {
    title: "Nicaragua",
    code: "NI",
    region: "north-america"
  },
  {
    title: "Niger",
    code: "NE",
    region: "africa"
  },
  {
    title: "Nigeria",
    code: "NG",
    region: "africa"
  },
  {
    title: "Niue",
    code: "NU",
    region: "oceania"
  },
  {
    title: "Norfolk Island",
    code: "NF",
    region: "oceania"
  },
  {
    title: "Northern Mariana Islands",
    code: "MP",
    region: "oceania"
  },
  {
    title: "Norway",
    code: "NO",
    region: "europe"
  },
  {
    title: "Oman",
    code: "OM",
    region: "asia"
  },
  {
    title: "Pakistan",
    code: "PK",
    region: "asia"
  },
  {
    title: "Palau",
    code: "PW",
    region: "oceania"
  },
  {
    title: "Palestine, State of",
    code: "PS",
    region: "asia"
  },
  {
    title: "Panama",
    code: "PA",
    region: "north-america"
  },
  {
    title: "Papua New Guinea",
    code: "PG",
    region: "oceania"
  },
  {
    title: "Paraguay",
    code: "PY",
    region: "south-america"
  },
  {
    title: "Peru",
    code: "PE",
    region: "south-america"
  },
  {
    title: "Philippines",
    code: "PH",
    region: "asia"
  },
  {
    title: "Pitcairn",
    code: "PN",
    region: "oceania"
  },
  {
    title: "Poland",
    code: "PL",
    region: "europe"
  },
  {
    title: "Portugal",
    code: "PT",
    region: "europe"
  },
  {
    title: "Puerto Rico",
    code: "PR",
    region: "north-america"
  },
  {
    title: "Qatar",
    code: "QA",
    region: "asia"
  },
  {
    title: "RÃ©union",
    code: "RE",
    region: "africa"
  },
  {
    title: "Romania",
    code: "RO",
    region: "europe"
  },
  {
    title: "Russian Federation",
    code: "RU",
    region: "asia"
  },
  {
    title: "Rwanda",
    code: "RW",
    region: "africa"
  },
  {
    title: "Saint BarthÃ©lemy",
    code: "BL",
    region: "europe"
  },
  {
    title: "Saint Helena, Ascension and Tristan da Cunha",
    code: "SH",
    region: "africa"
  },
  {
    title: "Saint Kitts and Nevis",
    code: "KN",
    region: "north-america"
  },
  {
    title: "Saint Lucia",
    code: "LC",
    region: "north-america"
  },
  {
    title: "Saint Martin (French part)",
    code: "MF",
    region: "north-america"
  },
  {
    title: "Saint Pierre and Miquelon",
    code: "PM",
    region: "north-america"
  },
  {
    title: "Saint Vincent and the Grenadines",
    code: "VC",
    region: "north-america"
  },
  {
    title: "Samoa",
    code: "WS",
    region: "oceania"
  },
  {
    title: "San Marino",
    code: "SM",
    region: "europe"
  },
  {
    title: "Sao Tome and Principe",
    code: "ST",
    region: "africa"
  },
  {
    title: "Saudi Arabia",
    code: "SA",
    region: "asia"
  },
  {
    title: "Senegal",
    code: "SN",
    region: "africa"
  },
  {
    title: "Serbia",
    code: "RS",
    region: "europe"
  },
  {
    title: "Seychelles",
    code: "SC",
    region: "africa"
  },
  {
    title: "Sierra Leone",
    code: "SL",
    region: "africa"
  },
  {
    title: "Singapore",
    code: "SG",
    region: "asia"
  },
  {
    title: "Sint Maarten (Dutch part)",
    code: "SX",
    region: "north-america"
  },
  {
    title: "Slovakia",
    code: "SK",
    region: "europe"
  },
  {
    title: "Slovenia",
    code: "SI",
    region: "europe"
  },
  {
    title: "Solomon Islands",
    code: "SB",
    region: "oceania"
  },
  {
    title: "Somalia",
    code: "SO",
    region: "africa"
  },
  {
    title: "South Africa",
    code: "ZA",
    region: "africa"
  },
  {
    title: "South Sudan",
    code: "SS",
    region: "africa"
  },
  {
    title: "Spain",
    code: "ES",
    region: "europe"
  },
  {
    title: "Sri Lanka",
    code: "LK",
    region: "asia"
  },
  {
    title: "Sudan",
    code: "SD",
    region: "africa"
  },
  {
    title: "Suriname",
    code: "SR",
    region: "south-america"
  },
  {
    title: "Svalbard and Jan Mayen",
    code: "SJ",
    region: "europe"
  },
  {
    title: "Swaziland",
    code: "SZ",
    region: "africa"
  },
  {
    title: "Sweden",
    code: "SE",
    region: "europe"
  },
  {
    title: "Switzerland",
    code: "CH",
    region: "europe"
  },
  {
    title: "Syrian Arab Republic",
    code: "SY",
    region: "asia"
  },
  {
    title: "Taiwan, Province of China",
    code: "TW",
    region: "asia"
  },
  {
    title: "Tajikistan",
    code: "TJ",
    region: "asia"
  },
  {
    title: "Tanzania, United Republic of",
    code: "TZ",
    region: "africa"
  },
  {
    title: "Thailand",
    code: "TH",
    region: "asia"
  },
  {
    title: "Timor-Leste",
    code: "TL",
    region: "asia"
  },
  {
    title: "Togo",
    code: "TG",
    region: "africa"
  },
  {
    title: "Tokelau",
    code: "TK",
    region: "oceania"
  },
  {
    title: "Tonga",
    code: "TO",
    region: "oceania"
  },
  {
    title: "Trinidad and Tobago",
    code: "TT",
    region: "north-america"
  },
  {
    title: "Tunisia",
    code: "TN",
    region: "africa"
  },
  {
    title: "Turkey",
    code: "TR",
    region: "europe"
  },
  {
    title: "Turkmenistan",
    code: "TM",
    region: "asia"
  },
  {
    title: "Turks and Caicos Islands",
    code: "TC",
    region: "north-america"
  },
  {
    title: "Tuvalu",
    code: "TV",
    region: "oceania"
  },
  {
    title: "Uganda",
    code: "UG",
    region: "africa"
  },
  {
    title: "Ukraine",
    code: "UA",
    region: "europe"
  },
  {
    title: "United Arab Emirates",
    code: "AE",
    region: "asia"
  },
  {
    title: "United Kingdom",
    code: "GB",
    region: "europe"
  },
  {
    title: "United States",
    code: "US",
    region: "north-america"
  },
  {
    title: "United States Minor Outlying Islands",
    code: "UM",
    region: "north-america"
  },
  {
    title: "Uruguay",
    code: "UY",
    region: "south-america"
  },
  {
    title: "Uzbekistan",
    code: "UZ",
    region: "asia"
  },
  {
    title: "Vanuatu",
    code: "VU",
    region: "oceania"
  },
  {
    title: "Venezuela, Bolivarian Republic of",
    code: "VE",
    region: "south-america"
  },
  {
    title: "Vietnam",
    code: "VN",
    region: "asia"
  },
  {
    title: "Virgin Islands, British",
    code: "VG",
    region: "north-america"
  },
  {
    title: "Virgin Islands, U.S.",
    code: "VI",
    region: "north-america"
  },
  {
    title: "Wallis and Futuna",
    code: "WF",
    region: "oceania"
  },
  {
    title: "Western Sahara",
    code: "EH",
    region: "africa"
  },
  {
    title: "Yemen",
    code: "YE",
    region: "asia"
  },
  {
    title: "Zambia",
    code: "ZM",
    region: "africa"
  },
  {
    title: "Zimbabwe",
    code: "ZW",
    region: "africa"
  }
];
export const countryListOld = [
  {
    title: "Andorra",
    code: "AD",
    region: "europe"
  },
  {
    title: "Australia",
    code: "AU",
    region: "oceania"
  },
  {
    title: "Austria",
    code: "AT",
    region: "europe"
  },
  {
    title: "Belgium",
    code: "BE",
    region: "europe"
  },
  {
    title: "Bulgaria",
    code: "BG",
    region: "europe"
  },
  {
    title: "Canada",
    code: "CA",
    region: "americas"
  },
  {
    title: "Cyprus",
    code: "CY",
    region: "europe"
  },
  {
    title: "Czech Republic",
    code: "CZ",
    region: "europe"
  },
  {
    title: "Denmark",
    code: "DK",
    region: "europe"
  },
  {
    title: "Estonia",
    code: "EE",
    region: "europe"
  },
  {
    title: "Finland",
    code: "FI",
    region: "europe"
  },
  {
    title: "France",
    code: "FR",
    region: "europe"
  },
  {
    title: "Germany",
    code: "DE",
    region: "europe"
  },
  {
    title: "Greece",
    code: "GR",
    region: "europe"
  },
  {
    title: "Hong Kong",
    code: "HK",
    region: "asia"
  },
  {
    title: "Hungary",
    code: "HU",
    region: "europe"
  },
  {
    title: "Iceland",
    code: "IS",
    region: "europe"
  },
  {
    title: "Ireland",
    code: "IE",
    region: "europe"
  },
  {
    title: "Italy",
    code: "IT",
    region: "europe"
  },
  {
    title: "Japan",
    code: "JP",
    region: "asia"
  },
  {
    title: "Korea, republic of",
    code: "KR",
    region: "asia"
  },
  {
    title: "Latvia",
    code: "LV",
    region: "europe"
  },
  {
    title: "Lithuania",
    code: "LT",
    region: "europe"
  },
  {
    title: "Luxembourg",
    code: "LU",
    region: "europe"
  },
  {
    title: "Malta",
    code: "MT",
    region: "europe"
  },
  {
    title: "Monaco",
    code: "MC",
    region: "europe"
  },
  {
    title: "Netherlands",
    code: "NL",
    region: "europe"
  },
  {
    title: "New Zealand",
    code: "NZ",
    region: "oceania"
  },
  {
    title: "Norway",
    code: "NO",
    region: "europe"
  },
  {
    title: "Poland",
    code: "PL",
    region: "europe"
  },
  {
    title: "Portugal",
    code: "PT",
    region: "europe"
  },
  {
    title: "Romania",
    code: "RO",
    region: "europe"
  },
  {
    title: "San Marino",
    code: "SM",
    region: "europe"
  },
  {
    title: "Singapore",
    code: "SG",
    region: "asia"
  },
  {
    title: "Slovak Republic",
    code: "SK",
    region: "europe"
  },
  {
    title: "Slovenia",
    code: "SI",
    region: "europe"
  },
  {
    title: "Spain",
    code: "ES",
    region: "europe"
  },
  {
    title: "Sweden",
    code: "SE",
    region: "europe"
  },
  {
    title: "Switzerland",
    code: "CH",
    region: "europe"
  },
  {
    title: "Taiwan",
    code: "TW",
    region: "asia"
  },
  {
    title: "Thailand",
    code: "TH",
    region: "asia"
  },
  {
    title: "United Kingdom",
    code: "GB",
    region: "europe"
  },
  {
    title: "United States",
    code: "US",
    region: "americas"
  }
];
