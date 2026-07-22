import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResidentMenu.css";

const weeklyMenu = {
    Monday: {
        breakfast: "Idli, Sambar and Coconut Chutney",
        lunch: "Rice, Dal, Potato Curry, Rasam and Curd",
        snacks: "Tea and Biscuits",
        dinner: "Chapati, Vegetable Kurma and Rice"
    },
    Tuesday: {
        breakfast: "Dosa, Sambar and Groundnut Chutney",
        lunch: "Rice, Tomato Dal, Beans Curry and Curd",
        snacks: "Tea and Samosa",
        dinner: "Rice, Egg Curry, Dal and Curd"
    },
    Wednesday: {
        breakfast: "Upma, Chutney and Banana",
        lunch: "Rice, Sambar, Cabbage Curry and Curd",
        snacks: "Tea and Pakoda",
        dinner: "Chapati, Paneer Curry and Rice"
    },
    Thursday: {
        breakfast: "Pongal, Sambar and Chutney",
        lunch: "Rice, Dal, Brinjal Curry and Buttermilk",
        snacks: "Tea and Bread Pakoda",
        dinner: "Vegetable Biryani, Raita and Sweet"
    },
    Friday: {
        breakfast: "Puri, Potato Curry and Tea",
        lunch: "Rice, Spinach Dal, Mixed Vegetable Curry and Curd",
        snacks: "Tea and Puffs",
        dinner: "Chapati, Chicken Curry or Paneer Curry and Rice"
    },
    Saturday: {
        breakfast: "Dosa, Chutney and Sambar",
        lunch: "Rice, Dal, Ladies Finger Curry and Rasam",
        snacks: "Tea and Noodles",
        dinner: "Fried Rice, Manchurian and Raita"
    },
    Sunday: {
        breakfast: "Vada, Idli, Sambar and Chutney",
        lunch: "Chicken Biryani or Vegetable Biryani, Raita and Sweet",
        snacks: "Tea and Cake",
        dinner: "Chapati, Dal Fry and Jeera Rice"
    }
};

const mealInformation = [
    {
        key: "breakfast",
        title: "Breakfast",
        time: "7:30 AM – 9:00 AM",
        icon: "breakfast"
    },
    {
        key: "lunch",
        title: "Lunch",
        time: "12:30 PM – 2:00 PM",
        icon: "lunch"
    },
    {
        key: "snacks",
        title: "Evening Snacks",
        time: "4:30 PM – 5:30 PM",
        icon: "snacks"
    },
    {
        key: "dinner",
        title: "Dinner",
        time: "7:30 PM – 9:00 PM",
        icon: "dinner"
    }
];

function ResidentMenu() {

    const navigate = useNavigate();

    const currentDay =
        new Intl.DateTimeFormat(
            "en-US",
            {
                weekday: "long"
            }
        ).format(new Date());

    const [selectedDay, setSelectedDay] =
        useState(
            weeklyMenu[currentDay]
                ? currentDay
                : "Monday"
        );

    const hostelMenu = weeklyMenu[selectedDay];

    const currentDate =
        new Intl.DateTimeFormat(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        ).format(new Date());

    return (
        <div className="resident-menu-page">

            <section className="resident-menu-banner">

                <div className="resident-menu-banner-content">

                    <span className="resident-menu-banner-label">
                        Hostel Dining
                    </span>

                    <h2>Daily Food Menu</h2>

                    <p>
                        View breakfast, lunch, snacks and dinner
                        scheduled for each day of the week.
                    </p>

                    <div className="resident-menu-banner-details">

                        <span>
                            <MenuIcon name="calendar" />
                            {currentDate}
                        </span>

                        <span>
                            <MenuIcon name="clock" />
                            Menu updated today
                        </span>

                    </div>

                </div>

                <div className="resident-menu-today-card">

                    <span>
                        {selectedDay === currentDay
                            ? "Today's Menu"
                            : "Selected Day"}
                    </span>

                    <strong>{selectedDay}</strong>

                    <small>4 meals scheduled</small>

                </div>

            </section>

            <section className="resident-menu-day-section">

                <div className="resident-menu-section-heading">

                    <div>
                        <h2>Weekly Menu</h2>

                        <p>
                            Select a day to view its meal schedule.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setSelectedDay(currentDay)
                        }
                    >
                        View Today
                    </button>

                </div>

                <div className="resident-menu-day-tabs">

                    {Object.keys(weeklyMenu).map((day) => (

                        <button
                            type="button"
                            key={day}
                            className={
                                selectedDay === day
                                    ? "resident-menu-day-active"
                                    : ""
                            }
                            onClick={() =>
                                setSelectedDay(day)
                            }
                        >

                            <span>
                                {day.substring(0, 3)}
                            </span>

                            <strong>{day}</strong>

                            {day === currentDay && (
                                <small>Today</small>
                            )}

                        </button>

                    ))}

                </div>

            </section>

            <section className="resident-menu-meals-section">

                <div className="resident-menu-section-heading">

                    <div>
                        <h2>{selectedDay}&apos;s Meals</h2>

                        <p>
                            Meal timings and food items for{" "}
                            {selectedDay}.
                        </p>
                    </div>

                    <span className="resident-menu-meal-count">
                        4 Meals
                    </span>

                </div>

                <div className="resident-menu-meals-grid">

                    {mealInformation.map((meal) => (

                        <article
                            className={`resident-meal-card resident-${meal.key}-card`}
                            key={meal.key}
                        >

                            <div className="resident-meal-card-top">

                                <span className="resident-meal-icon">
                                    <MenuIcon
                                        name={meal.icon}
                                    />
                                </span>

                                <span className="resident-meal-time">
                                    <MenuIcon name="clock" />
                                    {meal.time}
                                </span>

                            </div>

                            <div className="resident-meal-content">

                                <span className="resident-meal-type">
                                    {meal.title}
                                </span>

                                <h3>
                                    {hostelMenu[meal.key]}
                                </h3>

                            </div>

                            <div className="resident-meal-card-footer">

                                <span>
                                    <i></i>
                                    Dining hall
                                </span>

                                <span>
                                    Freshly prepared
                                </span>

                            </div>

                        </article>

                    ))}

                </div>

            </section>

            <section className="resident-menu-information-grid">

                <article className="resident-menu-info-card">

                    <span className="resident-menu-info-icon">
                        <MenuIcon name="dining" />
                    </span>

                    <div>
                        <h2>Dining Hall Timings</h2>

                        <p>
                            Please arrive during the scheduled
                            meal timings. Food may not be available
                            after the dining hall closes.
                        </p>

                        <div className="resident-dining-time-list">

                            <span>
                                Breakfast
                                <strong>7:30 – 9:00 AM</strong>
                            </span>

                            <span>
                                Lunch
                                <strong>12:30 – 2:00 PM</strong>
                            </span>

                            <span>
                                Snacks
                                <strong>4:30 – 5:30 PM</strong>
                            </span>

                            <span>
                                Dinner
                                <strong>7:30 – 9:00 PM</strong>
                            </span>

                        </div>

                    </div>

                </article>

                <article className="resident-menu-info-card">

                    <span className="resident-menu-info-icon">
                        <MenuIcon name="information" />
                    </span>

                    <div>
                        <h2>Dining Guidelines</h2>

                        <ul>
                            <li>
                                Carry your Resident ID to the dining hall.
                            </li>

                            <li>
                                Avoid wasting food and drinking water.
                            </li>

                            <li>
                                Keep the dining area clean.
                            </li>

                            <li>
                                Inform the admin about food allergies.
                            </li>
                        </ul>

                    </div>

                </article>

                <article className="resident-menu-feedback-card">

                    <span className="resident-menu-feedback-icon">
                        <MenuIcon name="feedback" />
                    </span>

                    <div>
                        <h2>How was today&apos;s food?</h2>

                        <p>
                            Share your feedback and help improve
                            the hostel dining experience.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/resident/feedback"
                                )
                            }
                        >
                            Give Food Feedback
                            <span>→</span>
                        </button>

                    </div>

                </article>

            </section>

        </div>
    );
}

function MenuIcon({ name }) {

    const icons = {

        calendar: (
            <>
                <rect x="4" y="5" width="16" height="15" rx="2" />
                <path d="M8 3V7M16 3V7M4 10H20" />
            </>
        ),

        clock: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7V12L15 14" />
            </>
        ),

        breakfast: (
            <>
                <path d="M5 10H19V12C19 16 16 19 12 19C8 19 5 16 5 12V10Z" />
                <path d="M8 6C8 4.5 9 4 9 3M12 6C12 4.5 13 4 13 3M16 6C16 4.5 17 4 17 3" />
            </>
        ),

        lunch: (
            <>
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="12" r="4" />
                <path d="M3 4V10M5 4V10M4 10V20M20 4V20" />
            </>
        ),

        snacks: (
            <>
                <path d="M5 8H17V14C17 17 14.5 19 11 19C7.5 19 5 17 5 14V8Z" />
                <path d="M17 10H19C20.1 10 21 10.9 21 12C21 13.1 20.1 14 19 14H17" />
                <path d="M8 4V6M11 3V6M14 4V6" />
            </>
        ),

        dinner: (
            <>
                <path d="M4 17H20M6 17C6 12 8.5 8 12 8C15.5 8 18 12 18 17" />
                <path d="M12 5V8M3 20H21" />
            </>
        ),

        dining: (
            <>
                <path d="M7 4V10M5 4V8C5 9.1 5.9 10 7 10C8.1 10 9 9.1 9 8V4" />
                <path d="M7 10V20M15 4V20M15 4C18 6 19 10 15 13" />
            </>
        ),

        information: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11V16M12 8H12.01" />
            </>
        ),

        feedback: (
            <>
                <path d="M12 3L14.7 8.5L21 9.4L16.5 13.8L17.5 20L12 17L6.5 20L7.5 13.8L3 9.4L9.3 8.5L12 3Z" />
            </>
        )
    };

    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {icons[name]}
        </svg>
    );
}

export default ResidentMenu;