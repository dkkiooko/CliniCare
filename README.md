
PHASE 1
web static cards (Bek)
	1. Landing page
	2. Reception page
	3. client side Information viewing page
	4. provider side information viewing page
models cards (Dan)
	1. Baseclass (patient)
	2. Doctor Class
	3. visit class
	4. FileStorage
	5. DB Storage
	6. MySQL login
tests	(both)
	1. Add tests with each task

PHASE 2
web_flask (Bek)
	1. Landing page
	2. Reception page
	3. client side Information viewing page
	4. provider side Information viewing page

api (Dan)
	1. /api/admin/<admin_id>/
		POST: Sends an authentication request with provider_id and password
	2. /api/admin/<admin_id>/clients
		GET: Return all the clients
	3. /api/admin/<admin_id>/clients/<client_id>/
		GET: Return all entries of specific client
	4. /api/admin/<admin_id>/clients/<client_id>/<date>
		GET: return all clients or 1 client by date or date range
	5. /api/admin/<admin_id>/providers/<client_id>/
		GET: Return all entries of specific provider
	6. /api/admin/<admin_id>/providers/<client_id>/<date>
		GET: return all providers or 1 provider by date or date range
