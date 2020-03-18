package com.mineiro.checkInThribo.service;

import com.mineiro.checkInThribo.domain.ResultAddress;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class CheckInServiceImp implements CheckInService {

    private List<Float> kilometers;

    @Override
    public void checkIn(final List<String> addressList) {
        kilometers = new ArrayList<>();

        addressList.forEach(address -> {
            final String uri = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + address + "&destinations=Av. Dr. Adail Nunes da Silva, 1 - Centro, Araraquara - SP, 14802-340&mode=walking&language=PT&sensor=false&key=AIzaSyAZu4pQPzGEEe8ijqiP4cKnMrz7-Orercg";

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.add("Access-Control-Allow-Origin", "*");

            ResultAddress address1 = restTemplate.getForObject(uri, ResultAddress.class);
            Float kilometer = getKilometers(address1);

            if(kilometer != null) {
                kilometers.add(kilometer);
            }
        });
    }

    private Float getKilometers(ResultAddress address) {
        if (address.rows.length > 0) {
            if (address.rows[0].elements.length > 0) {
                return Float.parseFloat(address.rows[0].elements[0].distance.text.replace(" km", "").replace(",","."));
            }
        }
        return  null;
    }
}
