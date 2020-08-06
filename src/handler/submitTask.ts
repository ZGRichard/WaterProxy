export default async function (changes) {
  if (changes.tasks.updated) {
    changes.tasks.updated.forEach((updatedTask) => {
      const entityChanges = updatedTask._changed.split(",");
      console.log("entityChanges", entityChanges);

      if (entityChanges.includes("status")) {
        if (updatedTask.status === "SUBMITTED") {
          console.log("we should process task submission");
        }
      }
    });
  }
}
