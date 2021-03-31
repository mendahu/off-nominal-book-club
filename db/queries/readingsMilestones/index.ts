import knex from "../../knex";

type MilestoneData = {
  label: string;
  date: string;
  readings_id?: string;
};

export const addMilestone = (
  label: string,
  date: string,
  readings_id: string
) => {
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

export const editMilestone = (
  milestoneId: string,
  label: string,
  date: string
) => {
  const newData: MilestoneData = { label, date };

  return knex<MilestoneData, string>("readings_milestones")
    .where("id", "=", milestoneId)
    .update(newData, ["id"]);
};
