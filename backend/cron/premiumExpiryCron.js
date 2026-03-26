import cron from "node-cron";
import User from "../models/User.js";
import { mailSender } from "../utils/mailSender.js";
import { premiumExpiryReminderTemplate } from "../Email/premiumExpiryReminder.js";

export const startPremiumExpiryCron = () => {
  // Runs every day at 9 AM
  cron.schedule("0 9 * * *", async () => {
    console.log("🔔 Running premium expiry reminder job");

    const today = new Date();
    const reminderDate = new Date();
    reminderDate.setDate(today.getDate() + 7);

    const startOfDay = new Date(reminderDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(reminderDate.setHours(23, 59, 59, 999));

    const users = await User.find({
      isPremium: true,
      premiumExpiresAt: { $gte: startOfDay, $lte: endOfDay },
      premiumExpiryReminderSent: false,
    });

    for (const user of users) {
      try {
        await mailSender(
          user.email,
          "⏰ Your EnerSense Premium expires in 7 days",
          premiumExpiryReminderTemplate({
            firstName: user.firstName,
            expiryDate: user.premiumExpiresAt.toDateString(),
          })
        );

        user.premiumExpiryReminderSent = true;
        await user.save();
      } catch (err) {
        console.error("Reminder email failed:", user.email);
      }
    }
  });
};
