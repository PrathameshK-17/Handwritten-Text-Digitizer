
const dns = require('dns');

const srvHostname = '_mongodb._tcp.document.6gp82po.mongodb.net';

console.log(`Resolving SRV for: ${srvHostname}`);

dns.resolveSrv(srvHostname, (err, addresses) => {
    if (err) {
        console.error('Error resolving SRV:', err);
        return;
    }

    console.log('SRV Records found:');
    console.log(addresses);

    const hosts = addresses.map(a => `${a.name}:${a.port}`).join(',');
    console.log('\nStandard Connection String Format (Copy this):');
    console.log(`mongodb://document:document@${hosts}/?ssl=true&authSource=admin&retryWrites=true&w=majority`);
});
