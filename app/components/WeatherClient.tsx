"use client";

import { useEffect, useState } from "react";

type WeatherData = {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    weather_code: number[];
  };
};

function weatherInfo(code: number) {
  if (code === 0) return ["☀️", "Clear"];
  if (code <= 3) return ["🌤️", "Partly Cloudy"];
  if (code <= 48) return ["🌫️", "Foggy"];
  if (code <= 57) return ["🌦️", "Drizzle"];
  if (code <= 67) return ["🌧️", "Rain"];
  if (code <= 77) return ["❄️", "Snow"];
  if (code <= 82) return ["🌦️", "Rain Showers"];
  if (code <= 86) return ["🌧️", "Heavy Showers"];
  if (code >= 95) return ["⛈️", "Thunderstorm"];

  return ["🌤️", "Weather"];
}

export default function WeatherClient({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadWeather() {
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${latitude}` +
          `&longitude=${longitude}` +
          `&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code` +
          `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code` +
          `&forecast_days=7` +
          `&timezone=Asia%2FKolkata`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Weather load failed");
        }

        const data =
          await response.json();

        setWeather(data);

      } catch (err) {
        console.error(err);
        setError("Weather information उपलब्ध नाही.");
      }
    }

    loadWeather();
  }, [latitude, longitude]);

  if (error) {
    return (
      <div className="weatherError">
        ⚠️ {error}
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="weatherLoading">
        🌤️ Loading Weather...
      </div>
    );
  }

  const current = weather.current;

  const [icon, condition] =
    weatherInfo(current.weather_code);

  return (
    <section className="weatherSection">

      {/* HEADER */}

      <div className="weatherHeader">

        <div>
          <span className="weatherLabel">
            06 / LIVE WEATHER
          </span>

          <h2>
            Rajgad
            <br />
            <span>Weather.</span>
          </h2>

          <p>
            राजगड परिसरातील सध्याचे हवामान
            आणि पुढील 7 दिवसांचा अंदाज.
          </p>
        </div>

        <div className="weatherIcon">
          {icon}
        </div>

      </div>


      {/* CURRENT WEATHER */}

      <div className="currentWeather">

        <div className="temperature">

          <small>
            CURRENT TEMPERATURE
          </small>

          <strong>
            {Math.round(
              current.temperature_2m
            )}°
          </strong>

          <span>
            {condition}
          </span>

        </div>

        <div className="weatherStats">

          <div>
            <span>FEELS LIKE</span>
            <strong>
              {Math.round(
                current.apparent_temperature
              )}°C
            </strong>
          </div>

          <div>
            <span>HUMIDITY</span>
            <strong>
              {current.relative_humidity_2m}%
            </strong>
          </div>

          <div>
            <span>WIND</span>
            <strong>
              {Math.round(
                current.wind_speed_10m
              )} km/h
            </strong>
          </div>

        </div>

      </div>


      {/* 7 DAY FORECAST */}

      <div className="forecast">

        {weather.daily.time.map(
          (date, index) => {

            const day =
              new Date(date).toLocaleDateString(
                "en-IN",
                {
                  weekday: "short",
                }
              );

            const [
              dayIcon,
              dayCondition,
            ] =
              weatherInfo(
                weather.daily.weather_code[index]
              );

            return (
              <div
                className="forecastDay"
                key={date}
              >

                <span className="day">
                  {index === 0
                    ? "TODAY"
                    : day.toUpperCase()}
                </span>

                <div className="dayIcon">
                  {dayIcon}
                </div>

                <strong>
                  {Math.round(
                    weather.daily
                      .temperature_2m_max[index]
                  )}°
                </strong>

                <small>
                  {Math.round(
                    weather.daily
                      .temperature_2m_min[index]
                  )}°
                </small>

                <p>
                  {dayCondition}
                </p>

                <em>
                  💧{" "}
                  {weather.daily
                    .precipitation_probability_max[
                      index
                    ] ?? 0}
                  %
                </em>

              </div>
            );
          }
        )}

      </div>


      <div className="weatherFooter">
        <span>
          ● LIVE WEATHER DATA
        </span>

        <small>
          Rajgad • Maharashtra
        </small>
      </div>


      <style jsx global>{`

        .weatherSection {
          padding: 90px 8%;
          background: #101711;
          color: white;
          border-top: 1px solid #29332d;
          border-bottom: 1px solid #29332d;
        }

        .weatherHeader {
          max-width: 1200px;
          margin: auto;

          display: flex;
          justify-content: space-between;
          align-items: center;

          gap: 30px;
        }

        .weatherLabel {
          color: #e7a93b;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 3px;
        }

        .weatherHeader h2 {
          margin: 15px 0;

          font-size: clamp(
            55px,
            8vw,
            95px
          );

          line-height: .85;
          letter-spacing: -5px;
        }

        .weatherHeader h2 span {
          color: #e7a93b;
        }

        .weatherHeader p {
          color: #8f9891;
          line-height: 1.7;
          max-width: 550px;
        }

        .weatherIcon {
          font-size: 110px;
          padding: 30px;
          border: 1px solid #303a33;
          background: #0b100c;
        }

        .currentWeather {
          max-width: 1200px;
          margin: 50px auto 0;

          display: grid;
          grid-template-columns: 1fr 1.5fr;

          border: 1px solid #303a33;
          background: #0b100c;
        }

        .temperature {
          padding: 35px;
          border-right: 1px solid #303a33;
        }

        .temperature small,
        .weatherStats span {
          display: block;

          color: #777f79;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .temperature strong {
          display: block;

          margin: 5px 0;

          font-size: 75px;
          color: #e7a93b;
        }

        .temperature span {
          color: #c4cbc6;
          font-size: 15px;
        }

        .weatherStats {
          display: grid;
          grid-template-columns:
            repeat(3,1fr);
        }

        .weatherStats div {
          padding: 35px 20px;

          display: flex;
          flex-direction: column;
          justify-content: center;

          border-right: 1px solid #303a33;
        }

        .weatherStats div:last-child {
          border-right: none;
        }

        .weatherStats strong {
          margin-top: 10px;
          font-size: 22px;
        }

        .forecast {
          max-width: 1200px;
          margin: 25px auto 0;

          display: grid;
          grid-template-columns:
            repeat(7,1fr);

          border: 1px solid #303a33;
        }

        .forecastDay {
          padding: 20px 10px;
          text-align: center;

          border-right: 1px solid #303a33;
        }

        .forecastDay:last-child {
          border-right: none;
        }

        .day {
          color: #e7a93b;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .dayIcon {
          margin: 12px 0;
          font-size: 30px;
        }

        .forecastDay strong {
          font-size: 20px;
        }

        .forecastDay small {
          margin-left: 5px;
          color: #777f79;
        }

        .forecastDay p {
          min-height: 28px;

          color: #858d87;
          font-size: 9px;
        }

        .forecastDay em {
          color: #719ac0;
          font-size: 9px;
          font-style: normal;
        }

        .weatherFooter {
          max-width: 1200px;
          margin: 20px auto 0;

          display: flex;
          justify-content: space-between;

          color: #666f68;
          font-size: 9px;
          letter-spacing: 2px;
        }

        .weatherFooter span {
          color: #e7a93b;
        }

        .weatherLoading,
        .weatherError {
          min-height: 300px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #101711;

          color: #e7a93b;
        }

        .weatherError {
          color: #ff9d9d;
        }

        @media(max-width:800px) {

          .currentWeather {
            grid-template-columns: 1fr;
          }

          .temperature {
            border-right: none;
            border-bottom: 1px solid #303a33;
          }

          .forecast {
            overflow-x: auto;
            grid-template-columns:
              repeat(7,120px);
          }

        }

        @media(max-width:600px) {

          .weatherSection {
            padding: 70px 6%;
          }

          .weatherHeader {
            align-items: flex-start;
          }

          .weatherIcon {
            font-size: 55px;
            padding: 15px;
          }

          .weatherStats strong {
            font-size: 15px;
          }

          .weatherStats div {
            padding: 20px 8px;
          }

          .weatherFooter small {
            display: none;
          }

        }

      `}</style>

    </section>
  );
}