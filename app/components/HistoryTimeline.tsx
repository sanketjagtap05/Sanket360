"use client";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

type HistoryTimelineProps = {
  items?: TimelineItem[];
};

export default function HistoryTimeline({
  items = [],
}: HistoryTimelineProps) {
  const timelineItems =
    items.length > 0
      ? items
      : [
          {
            year: "1647",
            title: "राजगड स्वराज्यात",
            description:
              "छत्रपती शिवाजी महाराजांनी राजगडाला स्वराज्याच्या महत्त्वाच्या केंद्रांपैकी एक म्हणून विकसित केले.",
          },
          {
            year: "1648",
            title: "राजधानीचा काळ",
            description:
              "राजगड स्वराज्याच्या राजधानीच्या स्वरूपात विकसित झाला आणि स्वराज्याच्या कारभाराचे महत्त्वाचे केंद्र बनला.",
          },
          {
            year: "1670",
            title: "स्वराज्याचा विस्तार",
            description:
              "स्वराज्याच्या विस्ताराच्या काळात राजगडाचे सामरिक आणि ऐतिहासिक महत्त्व कायम राहिले.",
          },
          {
            year: "आज",
            title: "ऐतिहासिक वारसा",
            description:
              "आज राजगड महाराष्ट्रातील प्रसिद्ध ऐतिहासिक किल्ला आणि trekking destination म्हणून ओळखला जातो.",
          },
        ];

  return (
    <section className="timelineSection">

      {/* HEADER */}

      <div className="timelineHeader">

        <div>
          <div className="timelineLabel">
            HISTORY / TIMELINE
          </div>

          <h2 className="timelineTitle">
            A Journey
            <br />
            Through <span>Time.</span>
          </h2>
        </div>

        <div className="eventCount">
          {String(timelineItems.length).padStart(2, "0")}
          <small>EVENTS</small>
        </div>

      </div>

      {/* TIMELINE */}

      <div className="timeline">

        <div className="timelineLine" />

        {timelineItems.map((item, index) => (
          <div
            className="timelineItem"
            key={`${item.year}-${index}`}
          >

            {/* DOT */}

            <div className="timelineDot" />

            {/* YEAR */}

            <div className="timelineYear">
              {item.year}
            </div>

            {/* CARD */}

            <div className="timelineCard">

              <div className="timelineNumber">
                {String(index + 1).padStart(2, "0")}
              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.description}
              </p>

            </div>

          </div>
        ))}

      </div>

      <style>{`

        .timelineSection {
          width: 100%;
          margin-top: 90px;
          padding: 90px 0 30px;
          color: #f4f4ef;
        }

        .timelineHeader {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 70px;
        }

        .timelineLabel {
          color: #e7a93b;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 4px;
        }

        .timelineTitle {
          margin: 18px 0 0;
          font-size: clamp(48px, 7vw, 82px);
          line-height: 0.9;
          letter-spacing: -5px;
          color: #f4f4ef;
        }

        .timelineTitle span {
          color: #e7a93b;
        }

        .eventCount {
          min-width: 100px;
          padding: 18px 15px;
          border: 1px solid #303832;
          background: #101511;
          color: #e7a93b;
          font-size: 34px;
          font-weight: 900;
          text-align: center;
        }

        .eventCount small {
          display: block;
          margin-top: 5px;
          color: #69736c;
          font-size: 8px;
          letter-spacing: 2px;
        }

        .timeline {
          position: relative;
          width: 100%;
          max-width: 1050px;
          margin: 0 auto;
          padding: 10px 0;
        }

        .timelineLine {
          position: absolute;
          left: 120px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #303832;
        }

        .timelineItem {
          position: relative;
          display: grid;
          grid-template-columns: 120px 1fr;
          column-gap: 50px;
          min-height: 180px;
        }

        .timelineDot {
          position: absolute;
          left: 113px;
          top: 3px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #e7a93b;
          border: 4px solid #070a08;
          box-shadow: 0 0 0 1px #e7a93b;
          z-index: 5;
        }

        .timelineYear {
          color: #e7a93b;
          font-size: 17px;
          font-weight: 900;
          text-align: right;
          padding-top: 0;
        }

        .timelineCard {
          position: relative;
          margin-bottom: 40px;
          padding: 28px 32px;
          background: #101511;
          border: 1px solid #303832;
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease;
        }

        .timelineCard:hover {
          transform: translateX(8px);
          border-color: #e7a93b;
          background: #131a16;
        }

        .timelineNumber {
          color: #59635b;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 3px;
          margin-bottom: 10px;
        }

        .timelineCard h3 {
          margin: 0 0 12px;
          color: #f5f5f2;
          font-size: 25px;
          line-height: 1.2;
        }

        .timelineCard p {
          margin: 0;
          color: #8b948d;
          font-size: 14px;
          line-height: 1.8;
        }

        /* MOBILE */

        @media (max-width: 700px) {

          .timelineSection {
            margin-top: 60px;
            padding: 70px 0 20px;
          }

          .timelineHeader {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 50px;
          }

          .timelineTitle {
            font-size: 52px;
            letter-spacing: -3px;
          }

          .eventCount {
            min-width: 80px;
            font-size: 27px;
          }

          .timeline {
            padding-left: 25px;
          }

          .timelineLine {
            left: 25px;
            width: 2px;
          }

          .timelineItem {
            display: block;
            min-height: 170px;
            padding-left: 45px;
          }

          .timelineDot {
            left: 18px;
            top: 3px;
          }

          .timelineYear {
            padding: 0;
            margin-bottom: 12px;
            text-align: left;
            font-size: 15px;
          }

          .timelineCard {
            padding: 22px;
            margin-bottom: 35px;
          }

          .timelineCard h3 {
            font-size: 21px;
          }

          .timelineCard p {
            font-size: 13px;
          }
        }

      `}</style>

    </section>
  );
}