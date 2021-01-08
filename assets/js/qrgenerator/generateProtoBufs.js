import {
    genCode, genPreTrace, genTrace, IEncryptedData, ILocationData,
    QRCodeContent,
    MasterTrace, match,
    mcl,
    PreTrace, TraceProof, PreTraceWithProof,
    QRCodeEntry, QRCodeTrace, scan,
    setupHA,
    sodium,
    Trace, verifyTrace,
    waitReady,
} from '@c4dt/libcrowdnotifier';

const generateProtoBufs = async (
    name,
    location,
    room,
    venueType,
    public_key,
    validFrom,
    validTo
) => {
    await waitReady();

    const healthAuthorityPublicKey = sodium.from_hex(`${public_key}`);
    const infoBinary = sodium.from_string([venueType, name, location, room].join(':'));
    const locationCode = genCode(healthAuthorityPublicKey, infoBinary);

    const mtr = new MasterTrace({
        masterPublicKey: locationCode.mtr.mpk.serialize(),
        masterSecretKeyLocation: locationCode.mtr.mskl.serialize(),
        info: locationCode.mtr.info,
        nonce1: locationCode.mtr.nonce1,
        nonce2: locationCode.mtr.nonce2,
        cipherTextHealthAuthority: locationCode.mtr.ctxtha,
    });
    
    // trace
    const qrTrace = new QRCodeTrace({
        version: 2,
        masterTraceRecord: mtr,
    });

    // entry 
    const data = QRCodeContent.create({
        name: name,
        location: location,
        room: room,
        venueType: venueType,
    });
    const qrEntry = QRCodeEntry.create({
        version: 2,
        data,
        masterPublicKey: locationCode.ent.serialize(),
        entryProof: locationCode.pEnt,
    });

    return {
        qrTrace: sodium.to_base64(QRCodeTrace.encode(qrTrace).finish()),
        qrEntry: sodium.to_base64(QRCodeEntry.encode(qrEntry).finish()),
    };
};

export default generateProtoBufs;
