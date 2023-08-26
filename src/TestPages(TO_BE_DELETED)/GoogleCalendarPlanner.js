import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";
import axios from "axios";

function GoogleCalendar() {
  const [startTD, setStartTD] = useState(new Date());
  const [endTD, setEndTD] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

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
    await axios({
      url: "https://www.googleapis.com/calendar/v3/calendars/primary/events",
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
  console.log(startTD);
  return (
    <div>
      <div>
        <h1>Google Calendar API</h1>
      </div>
      {session ? (
        <div>
          <h2>Hi {session.user.email} </h2>
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
