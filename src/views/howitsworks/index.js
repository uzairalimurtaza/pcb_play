import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import ReactPlayer from "react-player";
import {
  NextBtnIcon,
  PauseBtnIcon,
  PlaybtnIcon,
  VolumnIcon,
} from "../../assets";
import Duration from "./duration";
import "./index.css";
function Index() {
  const [player, setPlayer] = React.useState({
    duration: 0,
    played: 0,
    playing: false,
    muted: false,
  });
  const playerRef = React.useRef(null);
  return (
    <Container fluid className="howtoworks-container ">
      <Row>
        <Col lg={7} className="work-banner-right py-4">
          <Row className=" gap-3 description">
            <Col lg={12}>
              <h1>How it works</h1>
            </Col>
            <Col lg={12}>
              <h2>Create a board</h2>
            </Col>
            <Col lg={12}>
              <p className="m-0">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. duis aute irure dolor
                in reprehenderit
              </p>
            </Col>
            <Col lg={12}>
              <ul className="pcb-list ps-3">
                <li>lorem ipsum dolor sit amet, consectetur </li>
                <li>lorem ipsum dolor sit amet, consectetur </li>
                <li>lorem ipsum dolor sit amet, consectetur </li>
              </ul>
            </Col>
          </Row>
        </Col>
        <Col className="work-banner-left m-3 p-4 ">
          <Row className="gap-4 w-100">
            <Col lg={12}>
              <ReactPlayer
                playing={player.playing}
                ref={playerRef}
                muted={player.muted}
                onProgress={(e) => {
                  setPlayer({
                    ...player,
                    played: e.playedSeconds,
                  });
                }}
                onDuration={(duration) => {
                  setPlayer({
                    duration,
                  });
                }}
                width="100%"
                style={{
                  margin: "0 auto",
                }}
                controls={false}
                url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
              />
            </Col>
            <Col lg={12}>
              <InputRange
                allowSameValues={false}
                maxValue={100}
                minValue={0}
                numeric={false}
                onChange={(e) => {
                  setPlayer({
                    ...player,
                    played: (e / 100) * player.duration,
                  });
                  playerRef.current.seekTo((e / 100) * player.duration);
                }}
                value={(player.played / player.duration) * 100}
              />
            </Col>
            <Col lg={12} className="d-flex gap-3 align-items-center">
              <button
                style={{
                  width: 20,
                }}
                onClick={() => {
                  setPlayer({
                    ...player,
                    playing: !player.playing,
                  });
                }}
              >
                {player.playing ? <PauseBtnIcon /> : <PlaybtnIcon />}
              </button>
              <NextBtnIcon />
              <button
                onClick={() => {
                  setPlayer({
                    ...player,
                    muted: !player.muted,
                  });
                }}
              >
                <VolumnIcon />
              </button>
              <div className="pcb-player-time">
                <Duration seconds={player.played} />/
                <Duration seconds={player.duration} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default memo(Index);
