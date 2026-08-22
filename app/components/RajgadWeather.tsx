"use client";

import { useEffect, useState } from "react";

type WeatherData = {
  temperature: number;
  rainProbability: number;
  windSpeed: number;
  weatherCode: number;
};

function weatherText(code: number) {
  if (code === 0) return "Clear Sky";
  if (code <= 3) return "Partly Cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain Showers";
  if (code <= 99) return "Thunderstorm";

  return "Unknown";
}

function trekCondition(
  rainProbability: number,
  weatherCode: number
) {
  if (
    weatherCode >= 95 ||
    rainProbability >= 80
  ) {
    return {
      level: "AVOID TREK",
      icon: "🔴",
      message:
        "Heavy rain or storm conditions expected.",
    };
  }

  if (
    rainProbability >= 50 ||
    weatherCode >= 61
  ) {
    return {
      level: "CAUTION",
      icon: "🟡",
      message:
        "Rain possible. Check trail conditions before trekking.",
    };
  }

  return {
    level: "GOOD",
    icon: "🟢",
    message:
      "Weather looks suitable for trekking.",
  };
}

export default function RajgadWeather() {
  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadWeather() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=18.2466&longitude=73.6822&current=temperature_2m,weather_code,wind_speed_10m&hourly=precipitation_probability&timezone=Asia%2FKolkata"
        );

        if (!response.ok) {
          throw new Error("Weather API error");
        }

        const data = await response.json();

        setWeather({
          temperature:
            data.current.temperature_2m,

          windSpeed:
            data.current.wind_speed_10m,

          weatherCode:
            data.current.weather_code,

          rainProbability:
            data.hourly
              ?.precipitation_probability?.[0] ?? 0,
        });

      } catch (err) {
        console.error(err);

        setError(
          "Weather information currently unavailable."
        );
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, []);

  if (loading) {
    return (
      <div className="weatherCard loading">
        🌦️ Loading Rajgad weather...
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="weatherCard error">
        ⚠️ {error}
      </div>
    );
  }

  const condition = trekCondition(
    weather.rainProbability,
    weather.weatherCode
  );

  return (
    <section className="weatherSection">

      <div className="weatherHeader">

        <div>
          <span className="weatherLabel">
            RAJGAD • LIVE WEATHER
          </span>

          <h2>
            Trek
            <br />
            <span>Conditions.</span>
          </h2>
        </div>

        <div className="weatherStatus">
          <span>
            LIVE
          </span>

          <small>
            Updated now
          </small>
        </div>

      </div>

      <div className="weatherGrid">

        <div className="mainWeather">

          <div className="weatherIcon">
            {weather.weatherCode >= 61
              ? "🌧️"
              : weather.weatherCode >= 1
              ? "⛅"
              : "☀️"}
          </div>

          <strong>
            {Math.round(weather.temperature)}°
          </strong>

          <p>
            {weatherText(
              weather.weatherCode
            )}
          </p>

        </div>

        <div className="weatherStats">

          <div>
            <span>🌧️ RAIN</span>
            <strong>
              {weather.rainProbability}%
            </strong>
          </div>

          <div>
            <span>💨 WIND</span>
            <strong>
              {Math.round(weather.windSpeed)} km/h
            </strong>
          </div>

        </div>

        <div className="trekCondition">

          <span>
            TREK CONDITIONS
          </span>

          <strong>
            {condition.icon} {condition.level}
          </strong>

          <p>
            {condition.message}
          </p>

        </div>

      </div>

      <style jsx>{`

        .weatherSection {
          padding: 110px 8%;
          background: #0b100d;
          border-top: 1px solid #252d28;
          border-bottom: 1px solid #252d28;
        }

        .weatherHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          max-width: 1200px;
          margin: 0 auto 45px;
        }

        .weatherLabel {
          color: #e7a93b;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 3px;
        }

        .weatherHeader h2 {
          margin: 18px 0 0;
          font-size: clamp(50px, 7vw, 90px);
          line-height: .9;
          letter-spacing: -4px;
        }

        .weatherHeader h2 span {
          color: #e7a93b;
        }

        .weatherStatus {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
        }

        .weatherStatus span {
          color: #75c878;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .weatherStatus small {
          color: #69736c;
          font-size: 9px;
        }

        .weatherGrid {
          max-width: 1200px;
          margin: auto;

          display: grid;
          grid-template-columns:
            1.2fr 1fr 1.3fr;

          border: 1px solid #303832;
          background: #101511;
        }

        .mainWeather {
          padding: 35px;
          border-right: 1px solid #303832;
        }

        .weatherIcon {
          font-size: 45px;
          margin-bottom: 10px;
        }

        .mainWeather strong {
          display: block;
          font-size: 70px;
          line-height: 1;
        }

        .mainWeather p {
          color: #929b95;
          margin: 10px 0 0;
        }

        .weatherStats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-right: 1px solid #303832;
        }

        .weatherStats div {
          padding: 35px 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 10px;
          border-right: 1px solid #303832;
        }

        .weatherStats div:last-child {
          border-right: none;
        }

        .weatherStats span {
          color: #777f79;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1.5px;
        }

        .weatherStats strong {
          color: white;
          font-size: 22px;
        }

        .trekCondition {
          padding: 35px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .trekCondition > span {
          color: #e7a93b;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .trekCondition strong {
          margin-top: 12px;
          font-size: 24px;
        }

        .trekCondition p {
          color: #8f9891;
          font-size: 13px;
          line-height: 1.6;
          margin-bottom: 0;
        }

        .weatherCard {
          padding: 40px;
          background: #101511;
          color: #e7a93b;
          border: 1px solid #303832;
        }

        @media(max-width: 800px) {

          .weatherGrid {
            grid-template-columns: 1fr;
          }

          .mainWeather,
          .weatherStats {
            border-right: none;
            border-bottom: 1px solid #303832;
          }

          .weatherStats {
            min-height: 130px;
          }

        }

        @media(max-width: 600px) {

          .weatherSection {
            padding: 80px 6%;
          }

          .weatherHeader {
            align-items: flex-start;
            gap: 25px;
            flex-direction: column;
          }

          .weatherStatus {
            align-items: flex-start;
          }

          .mainWeather {
            padding: 25px;
          }

          .mainWeather strong {
            font-size: 60px;
          }

          .weatherStats div {
            padding: 25px 15px;
          }

          .trekCondition {
            padding: 25px;
          }

        }

      `}</style>

    </section>
  );
}