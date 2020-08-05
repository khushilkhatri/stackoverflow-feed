import React from "react";
import { Row as BSRow, Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

import Row from "./Row";
import Modal from "./Modal";
import "./App.scss";

type Props = {};

type State = {
  questions: any;
  page: number;
  index: any;
};

class App extends React.Component<Props, State> {
  state = {
    questions: [],
    page: 1,
    index: null
  };

  componentDidMount() {
    this.fetchQuestions();
  }

  date: number = parseInt((new Date().getTime() / 1000).toString());

  fetchQuestions: any = () => {
    const { page } = this.state;
    const queryObject: any = {
      page,
      key: "qU8y8L3eTkUTgsPABxDljw((",
      site: "stackoverflow",
      order: "desc",
      sort: "hot",
      filter: "withbody"
    };
    const query = Object.keys(queryObject)
      .map(k => `${k}=${queryObject[k]}`)
      .join("&");
    fetch(`https://api.stackexchange.com/2.2/questions?${query}`)
      .then(async (res: any) => {
        const data = await res.json();
        console.log(data);
        this.setState(state => {
          return {
            questions: state.questions.concat(data.items),
            page: state.page + 1
          };
        });
      })
      .catch((err: Error) => {
        window.alert("API fetch error. Stackoverflow API response 400.");
      });
  };

  onHide = () => {
    this.setState({
      index: null
    });
  };

  onSelect = (index: number) => {
    this.setState({
      index
    });
  };

  render() {
    const { questions, index } = this.state;
    return (
      <div className="App">
        <InfiniteScroll
          next={this.fetchQuestions}
          hasMore={true}
          loader={
            <img
              className="app-img"
              src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/09b24e31234507.564a1d23c07b4.gif"
            />
          }
          dataLength={questions.length}
        >
          <Container>
            <BSRow>
              {questions.map((question: any, index: number) =>
                question ? (
                  <Row
                    creation_date={question.creation_date}
                    key={index}
                    owner={question.owner}
                    title={question.title}
                    index={index}
                    onSelect={this.onSelect}
                  ></Row>
                ) : null
              )}
            </BSRow>
          </Container>
        </InfiniteScroll>
        {questions.length !== 0 && index !== null && (
          <Modal {...questions[index]} onHide={this.onHide}></Modal>
        )}
      </div>
    );
  }
}

export default App;
