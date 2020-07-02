import React from "react";
import { Table } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Row from "./Row";
import "./App.scss";

type Props = {};

type State = {
  questions: any;
  page: number;
};

class App extends React.Component<Props, State> {
  state = {
    questions: [],
    page: 1
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
      filter: "default"
    };
    const query = Object.keys(queryObject)
      .map(k => `${k}=${queryObject[k]}`)
      .join("&");
    fetch(`https://api.stackexchange.com/2.2/questions?${query}`)
      .then(async (res: any) => {
        const data = await res.json();
        this.setState(state => {
          return {
            questions: state.questions.concat(data.items),
            page: state.page + 1
          };
        });
      })
      .catch((err: Error) => {
        window.alert("API fetch error. Stackoverflow API response 400.");
        console.log(this.state);
      });
  };

  render() {
    const { questions } = this.state;
    console.log(questions);
    return (
      <div className="App">
        <InfiniteScroll
          next={this.fetchQuestions}
          hasMore={true}
          loader={<h4>Loading.......</h4>}
          dataLength={questions.length}
        >
          <Table bordered hover>
            <thead>
              <tr>
                <th>Author</th>
                <th>Title</th>
                <th>Creation Date</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question: any, index: number) =>
                question ? (
                  <Row
                    creation_date={question.creation_date}
                    key={index}
                    link={question.link}
                    owner={question.owner}
                    title={question.title}
                  ></Row>
                ) : null
              )}
            </tbody>
          </Table>
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
