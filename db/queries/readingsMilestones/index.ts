import knex from "../../knex";

export const addMilestone = (
  label: string,
  date: string,
  readings_id: string
) => {
  type MilestoneData = {
    label: string;
    date: string;
    readings_id: string;
  };

  const data: MilestoneData = {
    label,
    date,
    readings_id,
  };

  return knex<MilestoneData, string>("readings_milestones")
    .insert(data)
    .returning<string[]>("id");
};

export const deleteMilestone = (milestoneId: string) => {
  return knex<string, string>("readings_milestones")
    .where("id", milestoneId)
    .del<string>("id");
};
