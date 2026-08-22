"use client";

type HistoricalHighlightsProps = {
  history: string | null;
};

export default function HistoricalHighlights({
  history,
}: HistoricalHighlightsProps) {
  if (!history || !history.trim()) {
    return null;
  }

  const paragraphs = history
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <section className="historicalHighlights">

      <div className="historyTop">
        <div>
          <span className="historyLabel">
            HISTORICAL HIGHLIGHTS
          </span>

          <h2>
            इतिहासातील
            <br />
            <span>ठळक क्षण.</span>
          </h2>
        </div>

        <div className="historyBadge">
          <span>SAHYADRI</span>
          <strong>HISTORY</strong>
        </div>
      </div>

      <div className="historyTimeline">

        {paragraphs.map((text, index) => (
          <div className="historyItem" key={index}>

            <div className="historyNumber">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="historyLine">
              <span />
            </div>

            <div className="historyContent">
              <small>
                HIGHLIGHT {String(index + 1).padStart(2, "0")}
              </small>

              <p>{text}</p>
            </div>

          </div>
        ))}

      </div>

      <style jsx>{`

        .historicalHighlights {
          padding: 100px 8%;
          background: #101511;
          color: #f5f5f2;
          border-top: 1px solid #29312c;
          border-bottom: 1px solid #29312c;
        }

        .historyTop {
          max-width: 1100px;
          margin: 0 auto 70px;

          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 30px;
        }

        .historyLabel {
          color: #e7a93b;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 3px;
        }

        .historyTop h2 {
          margin: 18px 0 0;
          font-size: clamp(50px, 7vw, 90px);
          line-height: .9;
          letter-spacing: -4px;
        }

        .historyTop h2 span {
          color: #e7a93b;
        }

        .historyBadge {
          min-width: 130px;
          padding: 18px;

          border: 1px solid #39433c;

          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .historyBadge span {
          color: #777f79;
          font-size: 8px;
          letter-spacing: 2px;
        }

        .historyBadge strong {
          color: #e7a93b;
          font-size: 13px;
          letter-spacing: 2px;
        }

        .historyTimeline {
          max-width: 1100px;
          margin: 0 auto;
        }

        .historyItem {
          display: grid;
          grid-template-columns: 70px 30px 1fr;
          gap: 20px;
          min-height: 120px;
        }

        .historyNumber {
          color: #e7a93b;
          font-size: 12px;
          font-weight: 900;
          padding-top: 4px;
        }

        .historyLine {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .historyLine::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          background: #39433c;
        }

        .historyLine span {
          position: relative;
          z-index: 2;

          width: 10px;
          height: 10px;

          margin-top: 3px;

          border-radius: 50%;

          background: #e7a93b;

          box-shadow: 0 0 0 5px #101511;
        }

        .historyContent {
          padding: 0 0 45px;
          border-bottom: 1px solid #29312c;
        }

        .historyItem:last-child .historyContent {
          border-bottom: none;
        }

        .historyContent small {
          color: #737c75;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .historyContent p {
          max-width: 800px;
          margin: 12px 0 0;

          color: #c2c8c3;

          font-size: 17px;
          line-height: 1.8;
        }

        @media (max-width: 600px) {

          .historicalHighlights {
            padding: 75px 6%;
          }

          .historyTop {
            align-items: flex-start;
            flex-direction: column;
            margin-bottom: 50px;
          }

          .historyTop h2 {
            font-size: 58px;
          }

          .historyBadge {
            min-width: 110px;
          }

          .historyItem {
            grid-template-columns: 40px 20px 1fr;
            gap: 10px;
          }

          .historyContent p {
            font-size: 15px;
          }

        }

      `}</style>

    </section>
  );
}