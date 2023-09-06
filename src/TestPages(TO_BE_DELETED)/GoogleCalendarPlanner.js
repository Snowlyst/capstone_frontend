import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect, useState } from "react";
import axios from "axios";

function GoogleCalendar() {
  const [startTD, setStartTD] = useState(new Date());
  const [endTD, setEndTD] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [calendarId, setCalendarId] = useState("");
  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

  const calendarTitle = "verve";

  useEffect(() => {
    console.log(calendarId);
  }, [calendarId]);

  if (isLoading) {
    return <></>;
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });

    if (error) {
      alert("Error logging in");
      console.log(error);
    }
  }

  async function findOrCreateCalendar() {
    axios({
      url: "https://www.googleapis.com/calendar/v3/users/me/calendarList",
      method: "get",
      headers: {
        Authorization: `Bearer ${session.provider_token}`,
      },
    })
      .then((info) => {
        const existingCalendars = info.data.items;
        const existingCalendar = existingCalendars.find(
          (calendar) => calendar.summary === calendarTitle
        );
        console.log(existingCalendar);
        return existingCalendar;
      })
      .then((existingCalendar) => {
        let newCalendarId;
        if (existingCalendar) {
          newCalendarId = existingCalendar.id;
          setCalendarId(existingCalendar.id);

          console.log(
            "Calendar already exists. Using existing id:",
            newCalendarId
          );
        } else {
          axios({
            url: "https://www.googleapis.com/calendar/v3/calendars",
            method: "post",
            headers: {
              Authorization: `Bearer ${session.provider_token}`,
              "Content-Type": "application/json",
            },
            data: {
              summary: calendarTitle,
            },
          })
            .then((info) => {
              setCalendarId(info.data.id);
              console.log("New Calendar created with ID:", info.data.id);
            })
            .catch((error) => {
              console.log("second part", error);
            });
        }
      })
      .catch((error) => {
        console.log("first part", error);
      });
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function createCalendarEvent() {
    console.log("creating calendar event");
    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: startTD.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endTD.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    axios({
      url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
      method: "post",
      headers: {
        Authorization: "Bearer " + session.provider_token,
      },
      data: JSON.stringify(event),
    })
      .then((data) => {
        console.log(data);
        alert("Event made, check Calendar");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getEvents() {
    console.log("trying to get events..");
    const timeMin = new Date().toISOString();
    console.log(timeMin);
    await axios({
      url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
      method: "get",
      headers: {
        Authorization: "Bearer " + session.provider_token,
      },
      params: {
        timeMin: timeMin,
      },
    })
      .then((info) => {
        console.log(info);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div>
        <h1>Google Calendar API</h1>
      </div>
      {session ? (
        <div>
          <h2>Hi {session.user.email} </h2>
          <button onClick={() => findOrCreateCalendar()}>CalendarID</button>
          <br />
          <button onClick={() => getEvents()}>Get Events</button>
          <p>Start of Event</p>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker onChange={setStartTD} value={startTD} />
          </LocalizationProvider>
          <p>End of Event</p>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker onChange={setEndTD} value={endTD} />
          </LocalizationProvider>
          <p>Event name</p>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <p>Event description</p>
          <input
            type="text"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
          <hr />
          <button onClick={() => createCalendarEvent()}>
            Create Calendar Event
          </button>
          <br />
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <>
          <button onClick={() => googleSignIn()}>Sign in with Google</button>
        </>
      )}
    </div>
  );
}

export default GoogleCalendar;
