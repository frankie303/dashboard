import React from "react";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/Layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/Layout/MainSidebar/MainSidebar";
import MainFooter from "../components/Layout/MainFooter";
import CookiesBanner from "../components/Common/CookiesBanner";

import PasteYAML from "../modals/PasteYAML";
import WriteReview from "../modals/WriteReview";

import { Store } from "../flux";

class IconSidebarLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: Store.getModal(),
      loading: Store.isLoading(),
      acceptedCookies: localStorage.getItem("accepted-cookies"),
    };
    Store.on("update-ui", this.getData);
  }

  componentWillUnmount = () => {
    Store.removeListener("update-ui", this.getData);
  };

  getData = () => {
    const modal = Store.getModal();
    const loading = Store.isLoading();
    this.setState({ modal, loading });
  };

  acceptCookies = () => {
    localStorage.setItem("accepted-cookies", true);
    this.setState({ accepted: true });
  };

  render = () => {
    const { modal, acceptedCookies } = this.state;
    const { noNavbar, children, noFooter } = this.props;
    return (
      <Container fluid className="icon-sidebar-nav">
        <Row>
          <MainSidebar hideLogoText />
          <Col className="main-content col" tag="main">
            {!noNavbar && <MainNavbar />}
            {children}
            <CookiesBanner
              show={!acceptedCookies}
              acceptCookies={this.acceptCookies}
            />
            {!noFooter && <MainFooter />}
          </Col>
        </Row>
        <PasteYAML open={modal === "import"} />
        <WriteReview open={modal === "review"} />
      </Container>
    );
  };
}

IconSidebarLayout.defaultProps = {
  noNavbar: false,
  noFooter: false,
};

export default IconSidebarLayout;
