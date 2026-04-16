import { expect, test } from "@playwright/test";
import data from "../testdata/day31.json";

const BASE_URL = data.baseUrl;
const { firstname, lastname, totalprice, depositpaid, bookingdates, additionalneeds } = data.createBooking;

test("auth - should return a valid token", async ({ request }) => {
    const res = await request.post(`${BASE_URL}/auth`, {
        data: {
            username: data.login.username,
            password: data.login.password,
        },
        ignoreHTTPSErrors: true,
    });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("token");
    expect(typeof body.token).toBe("string");
});

test("booking - full CRUD flow", async ({ request }) => {
    // get token
    const authRes = await request.post(`${BASE_URL}/auth`, {
        data: {
            username: data.login.username,
            password: data.login.password,
        },
        ignoreHTTPSErrors: true,
    });
    expect(authRes.status()).toBe(200);
    const { token } = await authRes.json();

    // create booking
    const createRes = await request.post(`${BASE_URL}/booking`, {
        data: {
            firstname,
            lastname,
            totalprice,
            depositpaid,
            bookingdates: {
                checkin: bookingdates.checkin,
                checkout: bookingdates.checkout,
            },
            additionalneeds,
        },
        ignoreHTTPSErrors: true,
    });

    expect(createRes.status()).toBe(200);
    const created = await createRes.json();
    expect(created).toHaveProperty("bookingid");
    expect(created.booking).toMatchObject({
        firstname,
        lastname,
        totalprice,
        depositpaid,
        bookingdates: {
            checkin: bookingdates.checkin,
            checkout: bookingdates.checkout,
        },
        additionalneeds,
    });

    const bookingId = created.bookingid;

    // get all bookings and confirm our new one is in the list
    const getAllRes = await request.get(`${BASE_URL}/booking`, {
        ignoreHTTPSErrors: true,
    });
    expect(getAllRes.status()).toBe(200);
    const allBookings = await getAllRes.json();
    expect(allBookings.some((b: { bookingid: number }) => b.bookingid === bookingId)).toBeTruthy();

    // filter by name
    const filterByNameRes = await request.get(
        `${BASE_URL}/booking?firstname=${firstname}&lastname=${lastname}`,
        { ignoreHTTPSErrors: true }
    );
    expect(filterByNameRes.status()).toBe(200);
    const filteredByName = await filterByNameRes.json();
    expect(filteredByName.length).toBeGreaterThan(0);

    // filter by dates
    const filterByDateRes = await request.get(
        `${BASE_URL}/booking?checkin=${bookingdates.checkin}&checkout=${bookingdates.checkout}`,
        { ignoreHTTPSErrors: true }
    );
    expect(filterByDateRes.status()).toBe(200);
    const filteredByDate = await filterByDateRes.json();
    expect(filteredByDate.length).toBeGreaterThan(0);

    // full update - change additionalneeds
    const updateRes = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${token}`,
            Accept: "application/json",
        },
        data: {
            firstname,
            lastname,
            totalprice,
            depositpaid,
            bookingdates: {
                checkin: bookingdates.checkin,
                checkout: bookingdates.checkout,
            },
            additionalneeds: "dinner",
        },
        ignoreHTTPSErrors: true,
    });
    expect(updateRes.status()).toBe(200);
    const updated = await updateRes.json();
    expect(updated.additionalneeds).toBe("dinner");

    // partial update - change firstname only
    const patchRes = await request.patch(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${token}`,
        },
        data: {
            firstname: "Dadda",
        },
        ignoreHTTPSErrors: true,
    });
    expect(patchRes.status()).toBe(200);
    const patched = await patchRes.json();
    expect(patched.firstname).toBe("Dadda");

    // delete and confirm
    const deleteRes = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${token}`,
        },
        ignoreHTTPSErrors: true,
    });
    expect(deleteRes.status()).toBe(201);
});