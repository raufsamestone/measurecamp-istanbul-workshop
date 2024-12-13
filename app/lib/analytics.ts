type EventData = {
  event_name: string;
  event_data?: Record<string, any>;
  user_id?: string;
};

export const sendServerSideEvent = async (eventData: EventData) => {
  try {
    const response = await fetch('https://www.google-analytics.com/mp/collect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: eventData.user_id || 'anonymous',
        events: [{
          name: eventData.event_name,
          params: eventData.event_data
        }]
      })
    });
    return response.ok;
  } catch (error) {
    console.error('Error sending server-side event:', error);
    return false;
  }
};