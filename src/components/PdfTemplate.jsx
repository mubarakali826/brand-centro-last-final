import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { generateQRCode } from "../qrcodefile/Qrcode";
import projectData from "./floors_data.json";
import map from "../assets/map2.png";
import compass from "../assets/Compass.png";
import building from "../../public/Brand Centro 1.jpg";

import image107 from "../assets/floor Plans/107.png";
import image106 from "../assets/floor Plans/106.png";
import image105 from "../assets/floor Plans/105.png";
import image104 from "../assets/floor Plans/104.png";
import image103 from "../assets/floor Plans/103.png";
import image102 from "../assets/floor Plans/102.png";
import image101 from "../assets/floor Plans/101.png";
import image207 from "../assets/floor Plans/207.png";
import image206 from "../assets/floor Plans/206.png";
import image205 from "../assets/floor Plans/205.png";
import image204 from "../assets/floor Plans/204.png";
import image203 from "../assets/floor Plans/203.png";
import image202 from "../assets/floor Plans/202.png";
import image201 from "../assets/floor Plans/201.png";
import logo1 from "../assets/logo1.png";

Font.register({
  family: "Helvetica",
  src: "https://fonts.gstatic.com/s/helveticaneue/v70/Helvetica.ttf",
});

Font.register({
  family: "Helvetica-Bold",
  src: "https://fonts.gstatic.com/s/helveticaneue/v70/Helvetica-Bold.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  headercontainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Ensures the left and right headers are spaced out
    alignItems: "center",
    padding: 20,
  },
  headerContainer: {
    padding: 20,
    paddingTop: 30,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Ensures vertical alignment of items
  },
  leftSection: {
    flex: 1, // Takes up equal space on the left
    alignItems: "flex-start",
  },
  centerSection: {
    flex: 2, // Takes up more space in the center
    alignItems: "center", // Centers items in the section
    justifyContent: "center",
  },
  rightSection: {
    flex: 1, // Takes up equal space on the right
    alignItems: "flex-end",
  },
  projectName: {
    fontSize: 24, // Adjust for better alignment
    fontFamily: "Helvetica-Bold",
  },
  addressLabel: {
    fontSize: 8,
    color: "#000",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  address: {
    fontSize: 12,
    textAlign: "center",
    textDecoration: "underline",
  },
  websiteLabel: {
    fontSize: 8,
    color: "#000",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  website: {
    fontSize: 12,
    textDecoration: "underline",
  },
  date: {
    fontSize: 10,
    marginBottom: 5,
  },
  qrCode: {
    width: 50,
    height: 50,
  },
  headerLine: {
    height: 1,
    backgroundColor: "#000",
    marginTop: 10,
  },
  pageOneImage: {
    width: "100%", // Make the image span the full width of the container
    height: 400, // Increase height to make it larger
    objectFit: "cover", // Ensures the image covers the available area proportionally
    marginVertical: 10, // Add some space around the image for better layout
  },
  imageSection: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 400,
    // objectFit: "cover",
  },
  smallImage: {
    width: "100%",
    height: 100,
    // objectFit: "cover",
  },
  mapImage: {
    width: "50%",
    height: 200,
    marginLeft: 110,
  },
  buildingImage: {
    width: "50%",
    margin: "auto",
    height: 200,
  },
  infoTable: {
    marginTop: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  infoCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 3,
    minWidth: 60,
    color: "black",
  },
  headingCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 9,
    color: "#888",
    padding: 3,
    fontWeight: "bold",
  },
  compassContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  compass: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#000",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  direction: {
    position: "absolute",
    fontSize: 8,
    fontWeight: "bold",
  },
  north: { top: 3 },
  south: { bottom: 3 },
  east: { right: 3 },
  west: { left: 3 },
  paymentPage: {
    padding: 30,
    fontFamily: "Helvetica",
  },

  leftHeader: {
    flex: 1,
  },
  rightHeader: {
    flex: 1,
    alignItems: "flex-end",
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 2,
  },
  projectDetails: {
    marginTop: 20,
    paddingLeft: "35%",
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "center",
  },
  detailLabel: {
    width: 120,
    fontSize: 10,
    color: "#666",
  },
  detailValue: {
    fontSize: 10,
    flex: 1,
    color: "#000",
    fontWeight: "bold",
  },
  paymentSection: {
    marginTop: 20,
  },
  columnHeaders: {
    flexDirection: "row",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  columnHeader: {
    flex: 1,
    fontSize: 11,
    fontWeight: "bold",
    color: "#666",
  },
  stageHeader: {
    backgroundColor: "#E6EEF7",
    padding: 8,
    marginBottom: 10,
    width: "100%",
  },
  stageHeaderText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  paymentRow: {
    flexDirection: "row",
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  stageColumn: {
    flex: 2,
    fontSize: 10,
  },
  percentColumn: {
    flex: 1,
    fontSize: 10,
    textAlign: "center",
  },
  amountColumn: {
    flex: 1,
    textAlign: "right",
    fontSize: 10,
  },

  contentWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15, // Reduced margins
    paddingHorizontal: 20,
  },

  staticCompass: {
    width: 60, // Reduced width further
    marginRight: 30, // Space between compass and table
  },

  compassImage: {
    width: "100%",
    height: 60,
  },

  infoTableContainer: {
    flex: 1, // Takes remaining space
    maxWidth: "80%", // Limits table width
  },

  tableGrid: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },

  tableHeader: {
    flex: 1,
    padding: 8, // Reduced padding
    backgroundColor: "#F5F5F5",
    fontSize: 10, // Reduced font size
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    flex: 1,
    padding: 8, // Reduced padding
    fontSize: 10, // Reduced font size
    textAlign: "center",
  },
  mapContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginBottom: 20,
  },

  mapSection: {
    flex: 1,
    marginHorizontal: 10,
  },

  mapLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },

  mainImage: {
    width: "60%",
    height: 200,
    margin: "auto",
  },
  floorImage: {
    width: "70%",
    height: 230,
    marginLeft: 60, // Adjusted main image height
    // objectFit: "contain",
  },
  tableBase: {
    flex: 1,
    padding: 8,
    fontSize: 10,
    textAlign: "center",
  },

  tableHeaderStyle: {
    backgroundColor: "#F5F5F5",
    fontWeight: "bold",
  },
  footerContainer: {
    position: "absolute",
    bottom: 10, // Reduced bottom margin for more space
    left: 30,
    right: 30,
    flexDirection: "column", // Stack elements vertically
    alignItems: "center",
  },
  disclaimer: {
    fontSize: 7,
    color: "#666",
    textAlign: "center",
    marginBottom: 5, // Ensure space above the footer
  },
  footer: {
    fontSize: 8,
    textAlign: "center",
    color: "#666",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    paddingTop: 5,
    marginTop: 5, // Space between disclaimer and footer text
  },
});
<Text style={[styles.tableBase, styles.tableHeaderStyle]}>Project Name</Text>;
// Unit Info Page
const UnitInfoPage = ({ image, qrCodeURL, pageNumber, selectedUnit }) => {
  const unitNo = selectedUnit?.unitNo || "101"; // Default to 101 if no unit number is provided
  const corner = unitNo; // Assuming `unitNo` corresponds to `corner`
  const images = {
    107: image107,
    106: image106,
    105: image105,
    104: image104,
    103: image103,
    102: image102,
    101: image101,
    207: image207,
    206: image206,
    205: image205,
    204: image204,
    203: image203,
    202: image202,
    201: image201,
  };
  const floorPlan = corner.startsWith("1")
    ? images[corner]
    : images[`2${corner.slice(1)}`];
  // console.log(image, "data");
  const sellingPrice = selectedUnit?.sellingPriceAED
    ? parseFloat(selectedUnit.sellingPriceAED.replace(/[^0-9.]/g, ""))
    : 0; // Default to 0 if undefined

  const totalArea = selectedUnit?.totalAreaSqFt || 1; // Default to 1 to prevent division by zero
  const totalPricePerSqFt = totalArea > 0 ? sellingPrice / totalArea : 0;

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTop}>
          {/* Project Name Section */}
          <View style={styles.leftSection}>
            {/* <Text style={styles.projectName}> */}
            <Image src={logo1} />
            {/* </Text> */}
          </View>

          {/* Centered Address and Website Section */}
          <View style={styles.centerSection}>
            <Text style={styles.addressLabel}>Address</Text>
            <Text style={styles.address}>
              Jumeirah Garden City - Dubai, UAE
            </Text>
            <Text style={styles.websiteLabel}>Website</Text>
            <Text style={styles.website}>https://brandcentromodel.com</Text>
          </View>

          {/* QR Code and Date Section */}
          <View style={styles.rightSection}>
            <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
            <Image style={styles.qrCode} src={qrCodeURL} />
          </View>
        </View>

        {/* Divider Line */}
        <View style={styles.headerLine} />
      </View>
      {pageNumber === 1 && (
        <>
          <View style={styles.imageSection}>
            <Image style={styles.pageOneImage} src={image} />
          </View>
          <View style={styles.contentWrapper}>
            <View style={styles.staticCompass}>
              <Image src={compass} style={styles.compassImage} />
            </View>

            <View style={styles.infoTableContainer}>
              <View style={styles.tableGrid}>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableBase, styles.tableHeaderStyle]}>
                    Project Name
                  </Text>
                  <Text style={[styles.tableBase, styles.tableHeaderStyle]}>
                    Unit Number
                  </Text>
                  <Text style={[styles.tableBase, styles.tableHeaderStyle]}>
                    Unit Type
                  </Text>
                  <Text style={[styles.tableBase, styles.tableHeaderStyle]}>
                    Floor
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableBase}>Brand Centro</Text>
                  <Text style={styles.tableBase}>{selectedUnit?.unitNo}</Text>
                  <Text style={styles.tableBase}>{selectedUnit?.type}</Text>
                  <Text style={styles.tableBase}>{selectedUnit?.floor}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>totalAreaSqFt</Text>
                  <Text style={styles.tableHeader}>pricePerSqft</Text>
                  <Text style={styles.tableHeader}>totalPrice</Text>
                  <Text style={styles.tableHeader}>status</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>
                    {selectedUnit?.totalAreaSqFt || "N/A"}
                  </Text>
                  <Text style={styles.tableCell}>
                    {totalPricePerSqFt
                      ? `AED ${totalPricePerSqFt.toFixed(2)}`
                      : "N/A"}
                  </Text>
                  <Text style={styles.tableCell}>
                    {selectedUnit?.sellingPriceAED || "N/A"}
                  </Text>
                  <Text style={styles.tableCell}>
                    {selectedUnit?.status || "N/A"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.disclaimer}>
              All images, plans, layouts, information, data, and details are for
              reference only and are subject to change until the project reaches
              its final "as-built" status.
            </Text>
            <Text style={styles.footer}>
              Page {pageNumber} of 5 | Made by Noble Land Realestate
            </Text>
          </View>
        </>
      )}
      {pageNumber === 2 && (
        <>
          <View style={styles.imageSection}>
            <Image style={styles.floorImage} src={floorPlan} />
          </View>
          <View style={styles.imageSection}>
            <Image style={styles.mapImage} src={map} />
          </View>

          <View style={styles.contentWrapper}>
            <View style={styles.staticCompass}>
              <Image src={compass} style={styles.compassImage} />
            </View>

            <View style={styles.infoTableContainer}>
              <View style={styles.tableGrid}>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableBase, styles.tableHeaderStyle]}>
                    Project Name
                  </Text>
                  <Text style={[styles.tableBase, styles.tableHeaderStyle]}>
                    Unit Number
                  </Text>
                  <Text style={[styles.tableBase, styles.tableHeaderStyle]}>
                    Unit Type
                  </Text>
                  <Text style={[styles.tableBase, styles.tableHeaderStyle]}>
                    Floor
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableBase}>Brand Centro</Text>
                  <Text style={styles.tableBase}>{selectedUnit?.unitNo}</Text>
                  <Text style={styles.tableBase}>{selectedUnit?.type}</Text>
                  <Text style={styles.tableBase}>{selectedUnit?.floor}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>totalAreaSqFt</Text>
                  <Text style={styles.tableCell}>pricePerSqft</Text>
                  <Text style={styles.tableCell}>totalPrice</Text>
                  <Text style={styles.tableCell}>status</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>
                    {selectedUnit?.sellingPriceAED}
                  </Text>
                  <Text style={styles.tableHeader}>
                    {selectedUnit?.suiteAreaSqFt}
                  </Text>
                  <Text style={styles.tableHeader}>
                    {selectedUnit.sellingPriceAED}
                  </Text>
                  <Text style={styles.tableHeader}>{selectedUnit.status}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.disclaimer}>
              All images, plans, layouts, information, data, and details are for
              reference only and are subject to change until the project reaches
              its final "as-built" status.
            </Text>
            <Text style={styles.footer}>
              Page {pageNumber} of 5 | Made by Noble Land Realestate
            </Text>
          </View>
        </>
      )}
      {pageNumber === 3 && (
        <>
          <View style={styles.imageSection}>
            <Image style={styles.mainImage} src={image} />
          </View>
          <View style={styles.imageSection}>
            <Image style={styles.buildingImage} src={building} />
          </View>

          <View style={styles.contentWrapper}>
            <View style={styles.staticCompass}>
              <Image src={compass} style={styles.compassImage} />
            </View>

            <View style={styles.infoTableContainer}>
              <View style={styles.tableGrid}>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableBase, styles.tableHeaderStyle]}>
                    Project Name
                  </Text>
                  <Text style={[styles.tableBase, styles.tableHeaderStyle]}>
                    Unit Number
                  </Text>
                  <Text style={[styles.tableBase, styles.tableHeaderStyle]}>
                    Unit Type
                  </Text>
                  <Text style={[styles.tableBase, styles.tableHeaderStyle]}>
                    Floor
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableBase}>Brand Centro</Text>
                  <Text style={styles.tableBase}>{selectedUnit?.unitNo}</Text>
                  <Text style={styles.tableBase}>{selectedUnit?.type}</Text>
                  <Text style={styles.tableBase}>{selectedUnit?.floor}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>totalAreaSqFt</Text>
                  <Text style={styles.tableCell}>pricePerSqft</Text>
                  <Text style={styles.tableCell}>totalPrice</Text>
                  <Text style={styles.tableCell}>status</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>
                    {selectedUnit?.sellingPriceAED || "N/A"}
                  </Text>
                  <Text style={styles.tableHeader}>
                    {totalPricePerSqFt
                      ? `AED ${totalPricePerSqFt.toFixed(2)}`
                      : "N/A"}
                  </Text>
                  <Text style={styles.tableHeader}>
                    {selectedUnit?.sellingPriceAED || "N/A"}
                  </Text>
                  <Text style={styles.tableHeader}>
                    {selectedUnit?.status || "N/A"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </>
      )}

      <View style={styles.footerContainer}>
        <Text style={styles.disclaimer}>
          All images, plans, layouts, information, data, and details are for
          reference only and are subject to change until the project reaches its
          final "as-built" status.
        </Text>
        <Text style={styles.footer}>
          Page {pageNumber} of 5 | Made by Noble Land Realestate
        </Text>
      </View>
    </Page>
  );
};

// PaymentPlanPage component
const PaymentPlanPage = ({ pageNumber, currency = "AED", selectedUnit }) => {
  // Conversion rates (example values)
  const conversionRates = {
    AED: 1, // Base currency
    USD: 0.27, // Example conversion rate for AED to USD
  };

  // Get the total property price in AED
  const priceInAED = selectedUnit?.sellingPriceAED
    ? parseFloat(selectedUnit.sellingPriceAED.replace(/[^0-9.]/g, ""))
    : 0; // Default to 0 if undefined

  // Convert price to the selected currency
  const totalPrice = priceInAED * (conversionRates[currency] || 1);

  // Define payment stages and percentages
  const paymentStages = [
    { stage: "Down Payment", percentage: 15, description: "On Booking" },
    { stage: "2nd Installment", percentage: 15, description: "After 3 Months" },
    {
      stage: "3rd Installment",
      percentage: 15,
      description: "On 30% Construction",
    },
    {
      stage: "4th Installment",
      percentage: 15,
      description: "On 60% Construction",
    },
    { stage: "HandOver", percentage: 40, description: "On 100% Construction" },
  ];

  return (
    <Page size="A4" style={styles.paymentPage}>
      {/* Header Section */}
      <View style={styles.headercontainer}>
        <View style={styles.leftHeader}>
          {/* <Text style={styles.mainTitle}>Brand Centro</Text> */}
          <Image src={logo1} />
          <Text style={styles.subtitle}>{`PAYMENT PLAN (${currency})`}</Text>
          <Text style={styles.subtitle}>TWO BEDROOM TYPE A</Text>
        </View>
        <View style={styles.rightHeader}>
          <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
        </View>
      </View>

      {/* Project Details */}
      <View style={styles.projectDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Project name</Text>
          <Text style={styles.detailValue}>Brand Centro</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Address</Text>
          <Text style={styles.detailValue}>Dubai, UAE</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Expected Handover</Text>
          <Text style={styles.detailValue}>January 2025</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Unit Number</Text>
          <Text style={styles.detailValue}>{selectedUnit.unitNo}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Floor</Text>
          <Text style={styles.detailValue}>{selectedUnit.floor}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Unit Type</Text>
          <Text style={styles.detailValue}>{selectedUnit.type}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Unit Area</Text>
          <Text style={styles.detailValue}>{selectedUnit.totalAreaSqFt}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Property Price</Text>
          <Text style={styles.detailValue}>
            {totalPrice.toFixed(2)} {currency}
          </Text>
        </View>
      </View>

      {/* Payment Schedule */}
      <View style={styles.paymentSection}>
        <View style={styles.columnHeaders}>
          <Text style={[styles.columnHeader, { flex: 2 }]}>Stage</Text>
          <Text style={[styles.columnHeader, { flex: 1, textAlign: "center" }]}>
            %
          </Text>
          <Text style={[styles.columnHeader, { flex: 1, textAlign: "right" }]}>
            {currency}
          </Text>
        </View>

        {paymentStages.map(({ stage, percentage, description }, index) => (
          <React.Fragment key={index}>
            <View style={styles.stageHeader}>
              <Text style={styles.stageHeaderText}>{stage}</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.stageColumn}>{description}</Text>
              <Text style={styles.percentColumn}>{`${percentage}%`}</Text>
              <Text style={styles.amountColumn}>
                {(totalPrice * (percentage / 100)).toFixed(2)} {currency}
              </Text>
            </View>
          </React.Fragment>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.disclaimer}>
          All images, plans, layouts, information, data, and details are for
          reference only and are subject to change until the project reaches its
          final "as-built" status.
        </Text>
        <Text style={styles.footer}>
          Page {pageNumber} of 5 | Made by Noble Land Realestate
        </Text>
      </View>
    </Page>
  );
};

// Main Document Component update
const ApartmentPDF = ({ selectedUnitNo, imgURL }) => {
  const [qrCodeURL, setQrCodeURL] = React.useState("");

  React.useEffect(() => {
    const generateQR = async () => {
      // Get the current URL of the page
      const currentURL = window.location.href;
      try {
        const qrURL = await generateQRCode(currentURL);
        setQrCodeURL(qrURL);
      } catch (error) {
        console.error("Error generating QR code:", error);
        // Set a fallback QR code or handle the error appropriately
      }
    };

    generateQR();
  }, [selectedUnitNo]);
  if (!qrCodeURL) {
    return null; // Or return a loading state if needed
  }
  return (
    <Document>
      <UnitInfoPage
        qrCodeURL={qrCodeURL}
        pageNumber={1}
        image={imgURL}
        selectedUnit={selectedUnitNo}
      />
      <UnitInfoPage
        data={projectData}
        image={imgURL}
        qrCodeURL={qrCodeURL}
        pageNumber={2}
        selectedUnit={selectedUnitNo}
      />
      <UnitInfoPage
        data={projectData}
        image={imgURL}
        qrCodeURL={qrCodeURL}
        pageNumber={3}
        selectedUnit={selectedUnitNo}
      />
      <PaymentPlanPage
        pageNumber={4}
        currency="AED"
        selectedUnit={selectedUnitNo}
      />
      {/* <PaymentPlanPage
        pageNumber={5}
        currency="USD"
        selectedUnit={selectedUnitNo}
      /> */}
    </Document>
  );
};
export default ApartmentPDF;
