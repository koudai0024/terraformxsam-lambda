export const handler = async (event) => {
  console.log("Received SQS event:", JSON.stringify(event, null, 2));

  const failures = [];

  for (const record of event.Records ?? []) {
    try {
      const body = JSON.parse(record.body);
      console.log("Processing:", body);

      if (body?.fail) throw new Error("explicit failure for testing");
    } catch (err) {
      console.error("Failed to process record:", record.messageId, err);
      failures.push({ itemIdentifier: record.messageId });
    }
  }

  if (failures.length > 0) {
    return { batchItemFailures: failures };
  }

  return { ok: true };
};
