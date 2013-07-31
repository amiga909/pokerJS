var poker_starthands = {

    get_rank: function (hand) {
        var str = this.stringify(hand);
        return typeof poker_starthands.table[str] !== 'undefined' ? parseInt(poker_starthands.table[str], 10) : -1;
    },
    stringify: function (hand) {
        var str = '';
        v1 = parseInt(hand[0].slice(0, -1), 10);
        s1 = hand[0].charAt(hand[0].length - 1);
        v2 = parseInt(hand[1].slice(0, -1), 10);
        s2 = hand[1].charAt(hand[1].length - 1);
        if (v1 > v2) {
            str = (v1 + s1 + v2 + s2).toString();
        }
        else if (v1 == v2) {
            if (s1 >= s2) {
                str = (v1 + s1 + v2 + s2).toString();
            }
            else {
                str = (v2 + s2 + v1 + s1).toString();
            }
        }
        else {
            str = (v2 + s2 + v1 + s1).toString();
        }
        return str;
    },
    table: {'3h2d':29,'3s2h':29,'3c2d':29,'3d2s':29,'3h2s':29,'3d2h':29,'3c2h':29,'3h2c':29,'3s2c':29,'3c2s':29,'3s2d':29,'3d2c':29,'4h2s':30,'4d2h':30,'4s2c':30,'4s2d':30,'4h2d':30,'4s2h':30,'4c2s':30,'4d2c':30,'4c2d':30,'4h2c':30,'4c2h':30,'4d2s':30,'5c2h':31,'6c2d':31,'6h2d':31,'5s2c':31,'6h2c':31,'5c2s':31,'6s2c':31,'5d2s':31,'6c2s':31,'5h2c':31,'6d2h':31,'5s2d':31,'5s2h':31,'5c2d':31,'6d2s':31,'5d2c':31,'6c2h':31,'6h2s':31,'5d2h':31,'6d2c':31,'5h2d':31,'6s2d':31,'6s2h':31,'5h2s':31,'7c2s':32,'7s2c':32,'7s2d':32,'4d3h':32,'7h2d':32,'7s2h':32,'7d2h':32,'4s3d':32,'4d3c':32,'7c2h':32,'4h3c':32,'4h3d':32,'4c3d':32,'7d2c':32,'4s3h':32,'7h2c':32,'4h3s':32,'7d2s':32,'4c3s':32,'4s3c':32,'4d3s':32,'4c3h':32,'7h2s':32,'7c2d':32,'6d3h':33,'5d3h':33,'6c3s':33,'5h3d':33,'3s2s':33,'5h3c':33,'6s3h':33,'6c3h':33,'6d3c':33,'6h3d':33,'6c3d':33,'5c3s':33,'5s3h':33,'6s3d':33,'6h3c':33,'6s3c':33,'5c3h':33,'5d3c':33,'5c3d':33,'3h2h':33,'3c2c':33,'6h3s':33,'6d3s':33,'5s3d':33,'5d3s':33,'5s3c':33,'5h3s':33,'3d2d':33,'7s3c':34,'7c3s':34,'7h3s':34,'4c2c':34,'7h3c':34,'8c2s':34,'8c2d':34,'7d3s':34,'7h3d':34,'8d2c':34,'4d2d':34,'8d2s':34,'4s2s':34,'8s2h':34,'4h2h':34,'8s2d':34,'7s3d':34,'8h2s':34,'7c3h':34,'7d3h':34,'7c3d':34,'7d3c':34,'8s2c':34,'8d2h':34,'8h2d':34,'7s3h':34,'8h2c':34,'8c2h':34,'6s2s':35,'6c4s':35,'8c3s':35,'8d3h':35,'5h4d':35,'5s2s':35,'5h4c':35,'6s4h':35,'8c3d':35,'8s3h':35,'5c2c':35,'6h4c':35,'5h4s':35,'6h2h':35,'7h2h':35,'6d4s':35,'7s2s':35,'8d3c':35,'5c4d':35,'5s4h':35,'5d4h':35,'6c2c':35,'8s3d':35,'5h2h':35,'5d2d':35,'7c2c':35,'7d2d':35,'6c4h':35,'8s3c':35,'8d3s':35,'6s4c':35,'6h4s':35,'5d4c':35,'6h4d':35,'8h3c':35,'5d4s':35,'6s4d':35,'6d2d':35,'8h3d':35,'5c4h':35,'8h3s':35,'5c4s':35,'5s4d':35,'6c4d':35,'8c3h':35,'5s4c':35,'6d4c':35,'6d4h':35,'7c4h':36,'7c4d':36,'7h4c':36,'7h4d':36,'7d4s':36,'4d3d':36,'7d4h':36,'7h4s':36,'4c3c':36,'4h3h':36,'4s3s':36,'7c4s':36,'7s4h':36,'7d4c':36,'7s4d':36,'7s4c':36,'6h3h':37,'7c3c':37,'5c3c':37,'9d3c':37,'8d4h':37,'8c4s':37,'8h4s':37,'9d3s':37,'9c2h':37,'9h3d':37,'6d5s':37,'6s3s':37,'9h3c':37,'9c2d':37,'9c3s':37,'8s4h':37,'9s3d':37,'9s3h':37,'6c3c':37,'5h3h':37,'8h4d':37,'9s3c':37,'8h4c':37,'5s3s':37,'8d4c':37,'9h3s':37,'9d2s':37,'8s4d':37,'6d3d':37,'6c5d':37,'9d3h':37,'8s4c':37,'6c5h':37,'7d3d':37,'6h5c':37,'6h5d':37,'9d2h':37,'8c4h':37,'5d3d':37,'9s2h':37,'9c3d':37,'6d5h':37,'9h2d':37,'6c5s':37,'7s3s':37,'9d2c':37,'9s2d':37,'6s5c':37,'9h2c':37,'6s5d':37,'9s2c':37,'8d4s':37,'7h3h':37,'6h5s':37,'6d5c':37,'9c3h':37,'9h2s':37,'8c4d':37,'9c2s':37,'6s5h':37,'9d4s':38,'6s4s':38,'9s4d':38,'7d5c':38,'9s4c':38,'7s5h':38,'7s5c':38,'9c4s':38,'7d5h':38,'8h2h':38,'9d4c':38,'7s5d':38,'7d5s':38,'8s2s':38,'8d3d':38,'8c2c':38,'9h4s':38,'7h5s':38,'8h3h':38,'9d4h':38,'6h4h':38,'8s3s':38,'8d2d':38,'9h4d':38,'7c5s':38,'9c4h':38,'9s4h':38,'9h4c':38,'7h5d':38,'6d4d':38,'7c5d':38,'6c4c':38,'7c5h':38,'7h5c':38,'8c3c':38,'9c4d':38,'10s2h':39,'5h4h':39,'8c5s':39,'8c5h':39,'10h2s':39,'8s5c':39,'10d2s':39,'5s4s':39,'7s4s':39,'10d2h':39,'8d5s':39,'10h2d':39,'8c5d':39,'8s5d':39,'8d5c':39,'10d2c':39,'7c4c':39,'8h5s':39,'5d4d':39,'10s2d':39,'10h2c':39,'8s5h':39,'7h4h':39,'8d5h':39,'10c2d':39,'10c2s':39,'10s2c':39,'5c4c':39,'8h5c':39,'7d4d':39,'8h5d':39,'10c2h':39,'9c5d':40,'7d6h':40,'9h5s':40,'9d5s':40,'7c6s':40,'8d4d':40,'7s6h':40,'7h6s':40,'9d5h':40,'10s3c':40,'9c5s':40,'7c6d':40,'10c3s':40,'10d3h':40,'7h6d':40,'10c3h':40,'6d5d':40,'10h3c':40,'10h3d':40,'6c5c':40,'9s2s':40,'7h6c':40,'8c4c':40,'9d2d':40,'9c5h':40,'10d3s':40,'9s5c':40,'6s5s':40,'8h4h':40,'9s5h':40,'9s5d':40,'9h5c':40,'10s3d':40,'10d3c':40,'10c3d':40,'6h5h':40,'7s6c':40,'10h3s':40,'9h5d':40,'9c2c':40,'10s3h':40,'9h2h':40,'8s4s':40,'9d5c':40,'7s6d':40,'7c6h':40,'7d6s':40,'7d6c':40,'9s4s':41,'10s4d':41,'8c6d':41,'8s6c':41,'8s6h':41,'8d6c':41,'9c3c':41,'8s6d':41,'10d4c':41,'8c6h':41,'9h3h':41,'10c4s':41,'10s4c':41,'10c4h':41,'10h4d':41,'8c6s':41,'9d4d':41,'9h4h':41,'7s5s':41,'7d5d':41,'10d4s':41,'8d6s':41,'10s4h':41,'8h6c':41,'10h4s':41,'9s3s':41,'10h4c':41,'9c4c':41,'8h6s':41,'8d6h':41,'10d4h':41,'9d3d':41,'7h5h':41,'8h6d':41,'10c4d':41,'7c5c':41,'9d6c':42,'8c5c':42,'10s5h':42,'9h6d':42,'10h5d':42,'10h5c':42,'11h2d':42,'10c5h':42,'9c6s':42,'9d6s':42,'8s5s':42,'11d2c':42,'11h2c':42,'9c6d':42,'9h6c':42,'10d5h':42,'10d5c':42,'11c2d':42,'11c2h':42,'10d5s':42,'11d2h':42,'10c5s':42,'9s6h':42,'10h5s':42,'9c6h':42,'8d5d':42,'11c2s':42,'11s2c':42,'8h5h':42,'10s5c':42,'9d6h':42,'11s2h':42,'10s5d':42,'11s2d':42,'9s6c':42,'11h2s':42,'9h6s':42,'11d2s':42,'10c5d':42,'9s6d':42,'9c5c':43,'8h7d':43,'8c7s':43,'8s7d':43,'8s7h':43,'10c2c':43,'11c3s':43,'11c3d':43,'11h3d':43,'10h2h':43,'11s3h':43,'7c6c':43,'11h3c':43,'10s3s':43,'11d3h':43,'10s2s':43,'8d7h':43,'8h7c':43,'10c3c':43,'8d7c':43,'11d3s':43,'7d6d':43,'10d3d':43,'11d3c':43,'9d5d':43,'11c3h':43,'8d7s':43,'8s7c':43,'10d2d':43,'11s3d':43,'9h5h':43,'9s5s':43,'8c7d':43,'8c7h':43,'7s6s':43,'11h3s':43,'8h7s':43,'11s3c':43,'7h6h':43,'10h3h':43,'10h6s':44,'9c7s':44,'10h6d':44,'9c7h':44,'9s7h':44,'8h6h':44,'11d4s':44,'10d6h':44,'10c4c':44,'10s6c':44,'11c4s':44,'10h6c':44,'10s6d':44,'9d7c':44,'11d4c':44,'10c6h':44,'10d6c':44,'9h7c':44,'11h4d':44,'10s6h':44,'11c4d':44,'10d6s':44,'11d4h':44,'11h4c':44,'9c7d':44,'10h4h':44,'10d4d':44,'11h4s':44,'11s4c':44,'10s4s':44,'8d6d':44,'9s7d':44,'11c4h':44,'9d7s':44,'11s4h':44,'9h7s':44,'10c6d':44,'9h7d':44,'9s7c':44,'9d7h':44,'8s6s':44,'8c6c':44,'10c6s':44,'11s4d':44,'12d2c':45,'10d5d':45,'11c5d':45,'12s2d':45,'12s2h':45,'11s2s':45,'9s6s':45,'11h5d':45,'11d5s':45,'12s2c':45,'9d6d':45,'11h5c':45,'11c5h':45,'10s5s':45,'9c6c':45,'12h2d':45,'11d5h':45,'10h5h':45,'10c5c':45,'12d2h':45,'12c2s':45,'12c2h':45,'12h2s':45,'11h2h':45,'12c2d':45,'12d2s':45,'11s5c':45,'11h5s':45,'12h2c':45,'11d2d':45,'11c5s':45,'11s5d':45,'11c2c':45,'11s5h':45,'11d5c':45,'9h6h':45,'10s7d':46,'10s7h':46,'9d8c':46,'9d8s':46,'10h7s':46,'12s3d':46,'9c8h':46,'9c8d':46,'11c6s':46,'11h3h':46,'9c8s':46,'8d7d':46,'12d3s':46,'11c3c':46,'11s3s':46,'12h3s':46,'11s6d':46,'10s7c':46,'11h6d':46,'11h6c':46,'10c7s':46,'11d3d':46,'8c7c':46,'12s3c':46,'12d3c':46,'11d6c':46,'11d6s':46,'9d8h':46,'11d6h':46,'9s8h':46,'12h3d':46,'11s6c':46,'9h8d':46,'12c3d':46,'10d7c':46,'10c7d':46,'11c6d':46,'9h8s':46,'11s6h':46,'9s8c':46,'8s7s':46,'10d7s':46,'12h3c':46,'12d3h':46,'10c7h':46,'12c3h':46,'10h7d':46,'10d7h':46,'12c3s':46,'10h7c':46,'8h7h':46,'11c6h':46,'11h6s':46,'9h8c':46,'9s8d':46,'12s3h':46,'12c4h':47,'12h4c':47,'9c7c':47,'11c4c':47,'9s7s':47,'12s4c':47,'12s4d':47,'10s6s':47,'11s4s':47,'12d4c':47,'11h4h':47,'12s4h':47,'9d7d':47,'9h7h':47,'12h4s':47,'12d4h':47,'12h4d':47,'11d4d':47,'12d4s':47,'10d6d':47,'12c4d':47,'10c6c':47,'10h6h':47,'12c4s':47,'13h2s':48,'11s7c':48,'10d8c':48,'11d7h':48,'13h2d':48,'13c2h':48,'12d5h':48,'12s5h':48,'12c2c':48,'11c7s':48,'13h2c':48,'12d5c':48,'11d5d':48,'10s8d':48,'12c5h':48,'12s5d':48,'12c5s':48,'10h8d':48,'12s5c':48,'10d8s':48,'10h8s':48,'12s2s':48,'11c7h':48,'11s5s':48,'13c2d':48,'10h8c':48,'10s8h':48,'11s7d':48,'11c5c':48,'10s8c':48,'10c8h':48,'10c8s':48,'12c5d':48,'11c7d':48,'11d7s':48,'13d2h':48,'11h7s':48,'11h7c':48,'13s2h':48,'11d7c':48,'13d2s':48,'12h5d':48,'11h7d':48,'10c8d':48,'12h2h':48,'12h5s':48,'12h5c':48,'13s2c':48,'11h5h':48,'11s7h':48,'13s2d':48,'13d2c':48,'10d8h':48,'12d5s':48,'13c2s':48,'12d2d':48,'12c6d':49,'2s2h':49,'12d6h':49,'9h8h':49,'13s3h':49,'13s3d':49,'2d2c':49,'13c3s':49,'10d7d':49,'13c3h':49,'13h3s':49,'13d3c':49,'12h3h':49,'11h6h':49,'10h7h':49,'11s6s':49,'2h2d':49,'12c6s':49,'9d8d':49,'13s3c':49,'2h2c':49,'12c3c':49,'12s6c':49,'12h6s':49,'11d6d':49,'12s3s':49,'10s7s':49,'12s6h':49,'13h3c':49,'13d3h':49,'12c6h':49,'10c7c':49,'13d3s':49,'13h3d':49,'12h6d':49,'13c3d':49,'9c8c':49,'9s8s':49,'12d3d':49,'12s6d':49,'2s2c':49,'12d6c':49,'12d6s':49,'2s2d':49,'12h6c':49,'11c6c':49,'13s4h':50,'11s8c':50,'11s8d':50,'12h7d':50,'11d8c':50,'11d8s':50,'11h8s':50,'10d9c':50,'12d7h':50,'11s8h':50,'10c9h':50,'12h7c':50,'10d9h':50,'11c8s':50,'11d8h':50,'12d7c':50,'10s9d':50,'12d7s':50,'12c7h':50,'12d4d':50,'11h8d':50,'13s4c':50,'13s4d':50,'12s7d':50,'12h7s':50,'13d4s':50,'10h9d':50,'12s7c':50,'10d9s':50,'11c8h':50,'10h9c':50,'13d4c':50,'10s9c':50,'10c9d':50,'13h4c':50,'12s4s':50,'12c7d':50,'13c4s':50,'11h8c':50,'12h4h':50,'13h4s':50,'12c4c':50,'13d4h':50,'12s7h':50,'13c4d':50,'10h9s':50,'10c9s':50,'11c8d':50,'10s9h':50,'13c4h':50,'13h4d':50,'12c7s':50,'13s5h':51,'13h5s':51,'13c5s':51,'12c5c':51,'13s5c':51,'13d2d':51,'13h2h':51,'11s7s':51,'11c7c':51,'13c5h':51,'13c5d':51,'12d5d':51,'11h7h':51,'10s8s':51,'13d5s':51,'13h5c':51,'13c2c':51,'12h5h':51,'10d8d':51,'13d5c':51,'10h8h':51,'11d7d':51,'12s5s':51,'13d5h':51,'13h5d':51,'13s2s':51,'13s5d':51,'10c8c':51,'13d3d':52,'12h6h':52,'13s6c':52,'13d6c':52,'12c8h':52,'12c6c':52,'13s6h':52,'12d6d':52,'10c9c':52,'11c9h':52,'13s6d':52,'10h9h':52,'13d6s':52,'11s9d':52,'12d8h':52,'11h9d':52,'12h8s':52,'13h6c':52,'11c8c':52,'11h9c':52,'13s3s':52,'13c6s':52,'12h8c':52,'12c8d':52,'10d9d':52,'11s9c':52,'13c6d':52,'11d9h':52,'12c8s':52,'13d6h':52,'13h6s':52,'11c9d':52,'11d9c':52,'11d8d':52,'12d8c':52,'12h8d':52,'13h6d':52,'12s8c':52,'11d9s':52,'11h8h':52,'11c9s':52,'11s8s':52,'12d8s':52,'13c3c':52,'13c6h':52,'10s9s':52,'12s8h':52,'11s9h':52,'11h9s':52,'13h3h':52,'12s6s':52,'12s8d':52,'13s4s':53,'12d7d':53,'13s7d':53,'13d7c':53,'13c4c':53,'13s7h':53,'14s2d':53,'14s2c':53,'12s7s':53,'3s3h':53,'13s7c':53,'14c2s':53,'14d2s':53,'13h7d':53,'3d3c':53,'14d2h':53,'13c7d':53,'13c7s':53,'3s3d':53,'13d4d':53,'13h7s':53,'3s3c':53,'14h2c':53,'3h3c':53,'12h7h':53,'3h3d':53,'14h2s':53,'14c2h':53,'13c7h':53,'14d2c':53,'14s2h':53,'13d7h':53,'13h7c':53,'13h4h':53,'14h2d':53,'12c7c':53,'14c2d':53,'13d7s':53,'13c8h':54,'12d9c':54,'13h8s':54,'13s8d':54,'12d9h':54,'13s8c':54,'11c9c':54,'11c10d':54,'12h8h':54,'13c8s':54,'13s8h':54,'14s3c':54,'11s10h':54,'11d10s':54,'14s3d':54,'14d3c':54,'11d9d':54,'11c10s':54,'12c9s':54,'11h10d':54,'12d8d':54,'14s3h':54,'14h3s':54,'13d8c':54,'13h8c':54,'13c5c':54,'13d5d':54,'12c9h':54,'12c8c':54,'12h9s':54,'14c3h':54,'14d3h':54,'13c8d':54,'13d8s':54,'12h9c':54,'12s8s':54,'13h8d':54,'11h10c':54,'14h3c':54,'12d9s':54,'11s10d':54,'14c3s':54,'14c3d':54,'11d10h':54,'12h9d':54,'12s9d':54,'13s5s':54,'12s9h':54,'13d8h':54,'11s9s':54,'11s10c':54,'11c10h':54,'12c9d':54,'11h9h':54,'14d3s':54,'13h5h':54,'11h10s':54,'11d10c':54,'12s9c':54,'14h3d':54,'14d4h':55,'14s4h':55,'14c4s':55,'14d4c':55,'14s4d':55,'13c6c':55,'14s4c':55,'14h4c':55,'14d4s':55,'14h4d':55,'13d6d':55,'13h6h':55,'13s6s':55,'14c4d':55,'14h4s':55,'14c4h':55,'4h4d':56,'13c9h':56,'13c9d':56,'12d10c':56,'4d4c':56,'12d10h':56,'14h6s':56,'12d9d':56,'4s4d':56,'4s4c':56,'13s9h':56,'12c9c':56,'14h5s':56,'14c5h':56,'4s4h':56,'12c10h':56,'13s9d':56,'13h7h':56,'14h6d':56,'14c6d':56,'13s9c':56,'14h6c':56,'12d10s':56,'14c5d':56,'12c10d':56,'13d7d':56,'13h9c':56,'13c9s':56,'13s7s':56,'13h9d':56,'14d2d':56,'14h5d':56,'12c10s':56,'13d9s':56,'14h5c':56,'14d6s':56,'14c5s':56,'14h2h':56,'12h10s':56,'13c7c':56,'14s2s':56,'14d3d':56,'13d9h':56,'14c6h':56,'11s10s':56,'13h9s':56,'14d6h':56,'14d5s':56,'12s10c':56,'14c3c':56,'14s6h':56,'14s3s':56,'13d9c':56,'14c6s':56,'12h10d':56,'12h10c':56,'12h9h':56,'14d6c':56,'11d10d':56,'12s10d':56,'14s5c':56,'14s5d':56,'14s6d':56,'14s6c':56,'12s10h':56,'14d5c':56,'14h3h':56,'14d5h':56,'14c2c':56,'14s5h':56,'12s9s':56,'4h4c':56,'11h10h':56,'11c10c':56,'12d11h':57,'14h7s':57,'14d7c':57,'12s11h':57,'13c8c':57,'14s4s':57,'14h4h':57,'14s7h':57,'12c11h':57,'14d7s':57,'12d11c':57,'12h11d':57,'14c7d':57,'14c4c':57,'12d11s':57,'14d4d':57,'12s11c':57,'14s7c':57,'13h8h':57,'12h11c':57,'13s8s':57,'12s11d':57,'14s7d':57,'13d8d':57,'12c11s':57,'12c11d':57,'12h11s':57,'14h7c':57,'14c7h':57,'14c7s':57,'14d7h':57,'14h7d':57,'14s8c':58,'14c8h':58,'14s8d':58,'14h8s':58,'12d10d':58,'14d8c':58,'14c6c':58,'12h10h':58,'14h8c':58,'14c8d':58,'14h5h':58,'14h6h':58,'14s5s':58,'14d8h':58,'14d8s':58,'14c8s':58,'14s8h':58,'14d6d':58,'14h8d':58,'14c5c':58,'12s10s':58,'12c10c':58,'14d5d':58,'14s6s':58,'13d10h':59,'14d7d':59,'12c11c':59,'14s7s':59,'13h10c':59,'14d9h':59,'13h10d':59,'13s11h':59,'14h9s':59,'14c9h':59,'13h11s':59,'13c10d':59,'12d11d':59,'12h11h':59,'14c7c':59,'13d11c':59,'13d10c':59,'13c11h':59,'13c10s':59,'14h9c':59,'13d11s':59,'13s10c':59,'13d9d':59,'13s11c':59,'14c9d':59,'13s10d':59,'14d9s':59,'13h9h':59,'14s9c':59,'14d9c':59,'14h9d':59,'13c11d':59,'13d10s':59,'13s11d':59,'14c9s':59,'14s9d':59,'13c11s':59,'13h11c':59,'13s9s':59,'14h7h':59,'13c9c':59,'12s11s':59,'13h11d':59,'13d11h':59,'13s10h':59,'14s9h':59,'13h10s':59,'13c10h':59,'13d12s':60,'5s5h':60,'13s12h':60,'5h5c':60,'5h5d':60,'13c12s':60,'13h12c':60,'13c12h':60,'5s5c':60,'13c12d':60,'13s12c':60,'5s5d':60,'13d12h':60,'5d5c':60,'13h12s':60,'13d12c':60,'13s12d':60,'13h12d':60,'14c8c':61,'13h10h':61,'13d10d':61,'13c10c':61,'14s8s':61,'14d8d':61,'14h8h':61,'13s10s':61,'13c11c':62,'13d11d':62,'13h11h':62,'14c9c':62,'14c10d':62,'14h9h':62,'14c10s':62,'14d10h':62,'14h10s':62,'13s11s':62,'14s9s':62,'14h10d':62,'13s12s':62,'13d12d':62,'14s10d':62,'14d10c':62,'14d9d':62,'13c12c':62,'14s10h':62,'14d10s':62,'14s10c':62,'13h12h':62,'14h10c':62,'14c10h':62,'14h11s':63,'14c11d':63,'14d11h':63,'14c11s':63,'14s11h':63,'6d6c':63,'6s6h':63,'6s6c':63,'14h11d':63,'14c11h':63,'6h6c':63,'14d11s':63,'6s6d':63,'6h6d':63,'14s11c':63,'14h11c':63,'14s11d':63,'14d11c':63,'14d12s':64,'14h12d':64,'14h12c':64,'14h10h':64,'14d11d':64,'14c12s':64,'14d12h':64,'14c12d':64,'14c11c':64,'14c10c':64,'14d10d':64,'14s10s':64,'14c12h':64,'14s11s':64,'14h11h':64,'14s12h':64,'14d12c':64,'14s12d':64,'14s12c':64,'14h12s':64,'14d12d':65,'14d13h':65,'14h12h':65,'14c13d':65,'14d13s':65,'14s13d':65,'14s12s':65,'14c12c':65,'14h13d':65,'14d13c':65,'14s13c':65,'14h13s':65,'14c13s':65,'14h13c':65,'14c13h':65,'14s13h':65,'7s7h':66,'14s13s':66,'7s7c':66,'7h7c':66,'7h7d':66,'14h13h':66,'14d13d':66,'7d7c':66,'14c13c':66,'7s7d':66,'8d8c':69,'8s8d':69,'8s8c':69,'8h8d':69,'8h8c':69,'8s8h':69,'9h9d':72,'9s9h':72,'9d9c':72,'9s9c':72,'9h9c':72,'9s9d':72,'10h10d':75,'10s10h':75,'10d10c':75,'10s10c':75,'10s10d':75,'10h10c':75,'11h11d':77,'11s11d':77,'11d11c':77,'11s11h':77,'11h11c':77,'11s11c':77,'12d12c':80,'12h12c':80,'12h12d':80,'12s12h':80,'12s12d':80,'12s12c':80,'13d13c':82,'13s13c':82,'13h13c':82,'13h13d':82,'13s13d':82,'13s13h':82,'14s14c':85,'14h14d':85,'14h14c':85,'14d14c':85,'14s14d':85,'14s14h':85}

}