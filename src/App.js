import React, { useCallback, useEffect, useRef, useState } from "react";
import swapIcon from "./assets/swap-icon.svg";
import Select from "react-select";

export const App = React.memo(() => {
  const [curr01, setCurr01] = useState(() => options.find((el) => el.value === "USD"));
  const [curr02, setCurr02] = useState(() => options.find((el) => el.value === "LKR"));
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setoutputValue] = useState("");
  const [exRates, setExRates] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const swapIconRef = useRef();
  console.log(5);

  const handleChange = useCallback((id, value) => {
    if (id === "curr01") {
      setIsFetched(false);
      setCurr01(value);
    } else setCurr02(value);
  }, []);

  const handleSwap = useCallback(() => {
    const temp = curr01;
    setCurr01(curr02);
    setCurr02(temp);
  }, [curr01, curr02]);

  useEffect(() => {
    setIsFetched(false);
    (async () => {
      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${curr01.value}`);
        if (!response.ok) {
          throw new Error("Error while fetching data");
        }
        setExRates((await response.json()).rates);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [curr01]);

  useEffect(() => {
    if (exRates !== null && exRates !== undefined) setIsFetched(true);
  }, [exRates]);

  useEffect(() => {
    setoutputValue(() => ((inputValue || 1) * exRates?.[curr02?.value]).toFixed?.(2));
  }, [curr02, inputValue, isFetched]);

  return (
    <div id="container">
      <div id="headerDiv">
        <div id="logo"></div>
        <header id="title">Currency Converter</header>
      </div>

      <input type="number" name="input" id="input" value={inputValue} onChange={(e) => setInputValue(() => e.target.value)} placeholder="Enter Value" />

      <div id="selectionDiv">
        <Select options={options} className="select" name="currencyList" onChange={(el) => handleChange("curr01", el)} value={curr01} placeholder="Select currency" isClearable={true} />
        <img src={swapIcon} alt="" id="swap-icon" onClick={handleSwap} ref={swapIconRef} />
        <Select options={options} className="select" name="currencyList" onChange={(el) => handleChange("curr02", el)} value={curr02} placeholder="Select currency" isClearable={true} />
      </div>

      <div id="display">
        <p className={isFetched ? "" : "output-animation1"}>
          {isFetched ? (
            <span id="rate-output">
              {inputValue ? `${Number(inputValue).toLocaleString()}\u00A0${curr01?.value}` : `1\u00A0${curr01?.value}`} = <span id="output-right">{`${Number(outputValue).toLocaleString()}\u00A0${curr02?.value}`}</span>
            </span>
          ) : (
            <span id="fetch-msg">Fetching data...</span>
          )}
        </p>
      </div>
    </div>
  );
});

const options = [
  { value: "AED", label: "AED - United Arab Emirates Dirham" },
  { value: "AFN", label: "AFN - Afghan Afghani" },
  { value: "ALL", label: "ALL - Albanian Lek" },
  { value: "AMD", label: "AMD - Armenian Dram" },
  { value: "ANG", label: "ANG - Netherlands Antillian Guilder" },
  { value: "AOA", label: "AOA - Angolan Kwanza" },
  { value: "ARS", label: "ARS - Argentine Peso" },
  { value: "AUD", label: "AUD - Australian Dollar" },
  { value: "AWG", label: "AWG - Aruban Florin" },
  { value: "AZN", label: "AZN - Azerbaijani Manat" },
  { value: "BAM", label: "BAM - Bosnia and Herzegovina Mark" },
  { value: "BBD", label: "BBD - Barbados Dollar" },
  { value: "BDT", label: "BDT - Bangladeshi Taka" },
  { value: "BGN", label: "BGN - Bulgarian Lev" },
  { value: "BHD", label: "BHD - Bahraini Dinar" },
  { value: "BIF", label: "BIF - Burundian Franc" },
  { value: "BMD", label: "BMD - Bermudian Dollar" },
  { value: "BND", label: "BND - Brunei Dollar" },
  { value: "BOB", label: "BOB - Bolivian Boliviano" },
  { value: "BRL", label: "BRL - Brazilian Real" },
  { value: "BSD", label: "BSD - Bahamian Dollar" },
  { value: "BTN", label: "BTN - Bhutanese Ngultrum" },
  { value: "BWP", label: "BWP - Botswana Pula" },
  { value: "BYN", label: "BYN - Belarusian Ruble" },
  { value: "BZD", label: "BZD - Belize Dollar" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
  { value: "CDF", label: "CDF - Congolese Franc" },
  { value: "CHF", label: "CHF - Swiss Franc" },
  { value: "CLP", label: "CLP - Chilean Peso" },
  { value: "CNY", label: "CNY - Chinese Renminbi" },
  { value: "COP", label: "COP - Colombian Peso" },
  { value: "CRC", label: "CRC - Costa Rican Colon" },
  { value: "CUP", label: "CUP - Cuban Peso" },
  { value: "CVE", label: "CVE - Cape Verdean Escudo" },
  { value: "CZK", label: "CZK - Czech Koruna" },
  { value: "DJF", label: "DJF - Djiboutian Franc" },
  { value: "DKK", label: "DKK - Danish Krone" },
  { value: "DOP", label: "DOP - Dominican Peso" },
  { value: "DZD", label: "DZD - Algerian Dinar" },
  { value: "EGP", label: "EGP - Egyptian Pound" },
  { value: "ERN", label: "ERN - Eritrean Nakfa" },
  { value: "ETB", label: "ETB - Ethiopian Birr" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "FJD", label: "FJD - Fiji Dollar" },
  { value: "FOK", label: "FOK - Faroese Króna" },
  { value: "GBP", label: "GBP - Pound Sterling" },
  { value: "GEL", label: "GEL - Georgian Lari" },
  { value: "GGP", label: "GGP - Guernsey Pound" },
  { value: "GHS", label: "GHS - Ghanaian Cedi" },
  { value: "GIP", label: "GIP - Gibraltar Pound" },
  { value: "GMD", label: "GMD - Gambian Dalasi" },
  { value: "GNF", label: "GNF - Guinean Franc" },
  { value: "GTQ", label: "GTQ - Guatemalan Quetzal" },
  { value: "GYD", label: "GYD - Guyanese Dollar" },
  { value: "HKD", label: "HKD - Hong Kong Dollar" },
  { value: "HNL", label: "HNL - Honduran Lempira" },
  { value: "HRK", label: "HRK - Croatian Kuna" },
  { value: "HTG", label: "HTG - Haitian Gourde" },
  { value: "HUF", label: "HUF - Hungarian Forint" },
  { value: "IDR", label: "IDR - Indonesian Rupiah" },
  { value: "IMP", label: "IMP - Manx Pound" },
  { value: "INR", label: "INR - Indian Rupee" },
  { value: "IQD", label: "IQD - Iraqi Dinar" },
  { value: "IRR", label: "IRR - Iranian Rial" },
  { value: "ISK", label: "ISK - Icelandic Króna" },
  { value: "JEP", label: "JEP - Jersey Pound" },
  { value: "JMD", label: "JMD - Jamaican Dollar" },
  { value: "JOD", label: "JOD - Jordanian Dinar" },
  { value: "JPY", label: "JPY - Japanese Yen" },
  { value: "KES", label: "KES - Kenyan Shilling" },
  { value: "KGS", label: "KGS - Kyrgyzstani Som" },
  { value: "KHR", label: "KHR - Cambodian Riel" },
  { value: "KID", label: "KID - Kiribati Dollar" },
  { value: "KMF", label: "KMF - Comorian Franc" },
  { value: "KRW", label: "KRW - South Korean Won" },
  { value: "KWD", label: "KWD - Kuwaiti Dinar" },
  { value: "KYD", label: "KYD - Cayman Islands Dollar" },
  { value: "KZT", label: "KZT - Kazakhstani Tenge" },
  { value: "LAK", label: "LAK - Lao Kip" },
  { value: "LBP", label: "LBP - Lebanese Pound" },
  { value: "LKR", label: "LKR - Sri Lanka Rupee" },
  { value: "LRD", label: "LRD - Liberian Dollar" },
  { value: "LSL", label: "LSL - Lesotho Loti" },
  { value: "LYD", label: "LYD - Libyan Dinar" },
  { value: "MAD", label: "MAD - Moroccan Dirham" },
  { value: "MDL", label: "MDL - Moldovan Leu" },
  { value: "MGA", label: "MGA - Malagasy Ariary" },
  { value: "MKD", label: "MKD - Macedonian Denar" },
  { value: "MMK", label: "MMK - Burmese Kyat" },
  { value: "MNT", label: "MNT - Mongolian Tögrög" },
  { value: "MOP", label: "MOP - Macanese Pataca" },
  { value: "MRU", label: "MRU - Mauritanian Ouguiya" },
  { value: "MUR", label: "MUR - Mauritian Rupee" },
  { value: "MVR", label: "MVR - Maldivian Rufiyaa" },
  { value: "MWK", label: "MWK - Malawian Kwacha" },
  { value: "MXN", label: "MXN - Mexican Peso" },
  { value: "MYR", label: "MYR - Malaysian Ringgit" },
  { value: "MZN", label: "MZN - Mozambican Metical" },
  { value: "NAD", label: "NAD - Namibian Dollar" },
  { value: "NGN", label: "NGN - Nigerian Naira" },
  { value: "NIO", label: "NIO - Nicaraguan Córdoba" },
  { value: "NOK", label: "NOK - Norwegian Krone" },
  { value: "NPR", label: "NPR - Nepalese Rupee" },
  { value: "NZD", label: "NZD - New Zealand Dollar" },
  { value: "OMR", label: "OMR - Omani Rial" },
  { value: "PAB", label: "PAB - Panamanian Balboa" },
  { value: "PEN", label: "PEN - Peruvian Sol" },
  { value: "PGK", label: "PGK - Papua New Guinean Kina" },
  { value: "PHP", label: "PHP - Philippine Peso" },
  { value: "PKR", label: "PKR - Pakistani Rupee" },
  { value: "PLN", label: "PLN - Polish Złoty" },
  { value: "PYG", label: "PYG - Paraguayan Guaraní" },
  { value: "QAR", label: "QAR - Qatari Riyal" },
  { value: "RON", label: "RON - Romanian Leu" },
  { value: "RSD", label: "RSD - Serbian Dinar" },
  { value: "RUB", label: "RUB - Russian Ruble" },
  { value: "RWF", label: "RWF - Rwandan Franc" },
  { value: "SAR", label: "SAR - Saudi Riyal" },
  { value: "SBD", label: "SBD - Solomon Islands Dollar" },
  { value: "SCR", label: "SCR - Seychellois Rupee" },
  { value: "SDG", label: "SDG - Sudanese Pound" },
  { value: "SEK", label: "SEK - Swedish Krona" },
  { value: "SGD", label: "SGD - Singapore Dollar" },
  { value: "SHP", label: "SHP - Saint Helena Pound" },
  { value: "SLE", label: "SLE - Sierra Leonean Leone" },
  { value: "SOS", label: "SOS - Somali Shilling" },
  { value: "SRD", label: "SRD - Surinamese Dollar" },
  { value: "SSP", label: "SSP - South Sudanese Pound" },
  { value: "STN", label: "STN - São Tomé and Príncipe Dobra" },
  { value: "SYP", label: "SYP - Syrian Pound" },
  { value: "SZL", label: "SZL - Eswatini Lilangeni" },
  { value: "THB", label: "THB - Thai Baht" },
  { value: "TJS", label: "TJS - Tajikistani Somoni" },
  { value: "TMT", label: "TMT - Turkmenistan Manat" },
  { value: "TND", label: "TND - Tunisian Dinar" },
  { value: "TOP", label: "TOP - Tongan Pa'anga" },
  { value: "TRY", label: "TRY - Turkish Lira" },
  { value: "TTD", label: "TTD - Trinidad and Tobago Dollar" },
  { value: "TVD", label: "TVD - Tuvaluan Dollar" },
  { value: "TWD", label: "TWD - New Taiwan Dollar" },
  { value: "TZS", label: "TZS - Tanzanian Shilling" },
  { value: "UAH", label: "UAH - Ukrainian Hryvnia" },
  { value: "UGX", label: "UGX - Ugandan Shilling" },
  { value: "USD", label: "USD - United States Dollar" },
  { value: "UYU", label: "UYU - Uruguayan Peso" },
  { value: "UZS", label: "UZS - Uzbekistani So'm" },
  { value: "VES", label: "VES - Venezuelan Bolívar Soberano" },
  { value: "VND", label: "VND - Vietnamese Đồng" },
  { value: "VUV", label: "VUV - Vanuatu Vatu" },
  { value: "WST", label: "WST - Samoan Tālā" },
  { value: "XAF", label: "XAF - Central African CFA Franc" },
  { value: "XCD", label: "XCD - East Caribbean Dollar" },
  { value: "XDR", label: "XDR - Special Drawing Rights" },
  { value: "XOF", label: "XOF - West African CFA Franc" },
  { value: "XPF", label: "XPF - CFP Franc" },
  { value: "YER", label: "YER - Yemeni Rial" },
  { value: "ZAR", label: "ZAR - South African Rand" },
  { value: "ZMW", label: "ZMW - Zambian Kwacha" },
  { value: "ZWL", label: "ZWL - Zimbabwean Dollar" },
];
